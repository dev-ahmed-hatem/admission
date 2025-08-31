import random
from .models import StudentExam

for _ in range(20):
    national_id = "".join([str(random.randint(0, 9)) for _ in range(14)])
    StudentExam.objects.create(
        national_id=national_id,
        mark=None
    )
    print(f"تم إنشاء طالب بالرقم القومي: {national_id}")
