scss_file = '''
width: var(--button--width, auto);
  height: var(--button--height, auto);
  padding: var(--button--padding, 0.125em);
  margin: var(--button--margin, 0);
  display: var(--button--display, block);
  border: var(--button--border, none);
  border-radius: var(--button--border-radius, 0);
  background: var(--button--background, (211, 211, 211, 1));
  cursor: var(--button--cursor, auto);
  color: var(--button--color, (0, 0, 0, 1));
  text-align: var(--button--text-align, center);
  font-size: var(--button--font-size, 1em);
  text-decoration: var(--button--text-decoration, none);
'''

def print_scss_prop():
    for row in scss_file.split('\n'):
        if(len(row.split('var'))>1):
            prop = row.split('var')[1].split(',')[0][1::]
            default = ",".join(row.split('var')[1].split(',')[1::])[1:-2]
            print('* @prop '+prop+":  <br> Default: "+default)
print_scss_prop()