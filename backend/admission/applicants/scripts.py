import pandas as pd
from applicants.models import StudentExam

# Load the Excel file
df = pd.read_excel('./applicants/sheet.xls')  # Replace with your actual file path

# Rename columns for consistency (optional)
df.columns = ['name', 'national_id', 'major']

# Drop the index column if it's not needed
# df = df.drop(columns=['index'])

# Convert to list of dictionaries (optional, useful for further processing)
applicants = df.to_dict(orient='records')

# applicants.pop(0)

applicants = [row for row in applicants if not all(pd.isna(v) for v in row.values())]


print(len(applicants))

lis = []
for applicant in applicants:
    national_id = applicant["national_id"]
    StudentExam.objects.create(national_id=national_id)


    # if not secs.exists():
    #     print(employee_id)
    #     SecurityGuard.objects.create(employee_id=employee_id, name=guard["name"])


    # shift = Shift.objects.get(name=match_shift(guard["shift"]))
    #
    # try:
    #     SecurityGuard.objects.create(name=guard["name"], employee_id=guard["employee_id"], location=location,
    #                                  shift=shift)
    #
    # except IntegrityError:
    #     print(guard["employee_id"])

    # print(guard["project_name"], guard["location"])
