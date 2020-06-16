scss_file = '''
:host {
  width: var(--navigation-drawer--width, 12.5em);
  height: var(--navigation-drawer--height, 100vh);
  position: var(--navigation-drawer--position, fixed);
  left: var(--navigation-drawer--left, 0);
  top: var(--navigation-drawer--top, 0);
  right: var(--navigation-drawer--right, auto);
  bottom: var(--navigation-drawer--bottom, auto);
  padding: var(--navigation-drawer--padding, 0.625em);
  display: var(--navigation-drawer--display, flex);
  border: var(--navigation-drawer--border, none);
  background: var(--navigation-drawer--background, rgba(151, 151, 151, 1));
  color: var(--navigation-drawer--color, rgba(0, 0, 0, 1));
  font-size: var(--navigation-drawer--font-size, 1em);
  justify-content: var(--navigation-drawer--justify-content, left);
  align-items: var(--navigation-drawer--align-items, start);
  transition: var(--dropdown-item_children--transition, all 0.5s);
  flex-direction: column;
  overflow: hidden;
}

:host(.closed) {
  width: 0;
  padding: 0;
}

'''

def print_scss_prop():
    for row in scss_file.split('\n'):
        if(len(row.split('var'))>1):
            prop = row.split('var')[1].split(',')[0][1::]
            default = ",".join(row.split('var')[1].split(',')[1::])[1:-2]
            print('* @prop '+prop+":  <br> Default: "+default)
print_scss_prop()