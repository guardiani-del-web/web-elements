scss_file = '''

:host {
  display: var(--display, flex);
  width: var(--width, fit-content);
  height: var(--height, fit-content);
  justify-content: var(--justify-content, unset);
  align-items: var(--align-items, unset);
  flex-direction: var(--flex-direction, column);
  border: var(--border, 0.063em solid rgb(0, 0, 0));
}
'''

def print_scss_prop():
    for row in scss_file.split('\n'):
        if(len(row.split('var'))>1):
            prop = row.split('var')[1].split(',')[0][1::]
            default = ",".join(row.split('var')[1].split(',')[1::])[1:-2]
            print('* @prop '+prop+":  <br> Default: "+default)
print_scss_prop()