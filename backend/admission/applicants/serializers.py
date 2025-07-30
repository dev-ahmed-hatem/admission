from rest_framework import serializers
from .models import Applicant, TranscriptFile
from django.core.files.base import ContentFile


class TranscriptFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TranscriptFile
        fields = ['id', 'file']

    def create(self, validated_data):
        file = validated_data.pop('file')
        if not file:
            raise serializers.ValidationError({'file': 'لم يتم توفير الملف'})
        instance = TranscriptFile.objects.create(**validated_data)
        instance.file = file
        instance.save()
        return instance


class ApplicantListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicant
        fields = "__all__"


class ApplicantReadSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M", read_only=True)
    transcript_files = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Applicant
        fields = "__all__"

    def get_transcript_files(self, instance):
        request = self.context.get("request")
        files = []
        for file in instance.transcript_files.all():
            if file.file:  # checks if a file has been uploaded
                try:
                    url = request.build_absolute_uri(file.file.url)
                    files.append(url)
                except ValueError:
                    continue  # Skip in case of no file associated
        return files


class ApplicantWriteSerializer(serializers.ModelSerializer):
    transcripts = serializers.ListField(child=serializers.FileField(), required=False, write_only=True)

    class Meta:
        model = Applicant
        fields = "__all__"

    def validate_transcripts(self, value):
        if len(value) > 2:
            raise serializers.ValidationError("يمكن رفع ملفين كحد أقصى لبيان الدرجات.")
        if not value:
            raise serializers.ValidationError("قم برفع بيان الدرجات")
        return value

    def validate(self, attrs):
        """
        Extra validation for internship_certificate
        """
        division = attrs.get('division')
        internship_certificate = attrs.get('internship_certificate')

        if division != "البصريات" and not internship_certificate:
            raise serializers.ValidationError({
                "internship_certificate": "شهادة الامتياز مطلوبة"
            })

        return attrs

    def create(self, validated_data):
        transcripts = validated_data.pop('transcripts', [])

        if not transcripts:
            raise serializers.ValidationError({"transcripts": "قم برفع بيان الدرجات"})

        applicant = Applicant.objects.create(**validated_data)

        for transcript in transcripts:
            transcript_instance = TranscriptFile.objects.create(applicant=applicant)

            ext = transcript.name.split(".")[-1]

            new_filename = f"{applicant.arabic_name}_بيان درجات_{transcript_instance.id}.{ext}"

            # Read the file content
            content = transcript.read()

            # Create a ContentFile with the new name
            django_file = ContentFile(content, name=new_filename)

            # Save it
            transcript_instance.file.save(transcript.name, django_file, save=True)

        return applicant
