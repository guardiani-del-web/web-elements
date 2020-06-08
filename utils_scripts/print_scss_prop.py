scss_file = '''
:host {
  display: block;
  position: relative;
  width: fit-content;
}

:host(:hover) > .tooltip  {
  display: block;
}

.tooltip {
  position: absolute;
  display: none;
  width: var(--tooltip--width, fit-content);
  height: var(--tooltip--height, fit-content);
  padding: var(--tooltip--padding, 3px);
  background: var(--tooltip--background, rgba(128, 128, 128, 0.8));
  top: var(--tooltip--top, 100%);
  left: var(--tooltip--left, 50%);
  right: var(--tooltip--right, auto);
  bottom: var(--tooltip--bottom, auto);
  transform: var(--tooltip--transform, translate(-50%, 0%));
}

'''

def print_scss_prop():
    for row in scss_file.split('\n'):
        if(len(row.split('var'))>1):
            prop = row.split('var')[1].split(',')[0][1::]
            default = ",".join(row.split('var')[1].split(',')[1::])[1:-2]
            print('* @prop '+prop+":  <br> Default: "+default)
print_scss_prop()