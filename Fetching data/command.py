import subprocess
import json

cmd = 'java -Ddebug=true -Dspeed="2.0" -classpath C:\\feed-play-1.0.jar\\ hackathon.player.Main C:\\dataset.csv 9011'
process = subprocess.Popen(cmd, stdout=subprocess.PIPE, universal_newlines=True)

output_lines = []
for line in process.stdout:
    output_lines.append(line.strip())

json_output = []
for line in output_lines:
    try:
        json_obj = json.loads(line)
        json_output.append(json_obj)
    except json.JSONDecodeError:
        pass

with open('output.json', 'w') as file:
    json.dump(json_output, file)

