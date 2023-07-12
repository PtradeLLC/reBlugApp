
import os
import subprocess

def handler(event, context):
    # Change to the project directory
    os.chdir('/Users/admin/Desktop/PublicTrades/forgedMartAIPro/backend')

    # Install project dependencies
    subprocess.run(['pip', 'install', '-r', 'requirements.txt'])

    # Run your Python project
    subprocess.run(['python', 'your_project_file.py'])

    # Return a response if needed
    return {
        'statusCode': 200,
        'body': 'Deployment successful!'
    }
