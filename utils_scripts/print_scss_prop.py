scss_file = '''
:host {
  display: block;
}

.back {
  display: none;
  width: 100vw;
  height: 100vh;
  background: var(--back--background, rgba(128, 128, 128, 0.35));
  position: fixed;
  justify-content: var(--back--justify-content, center);
  align-items: var(--back--align-items, center);

  &.visible {
    display: flex;
  }
}

.modal {
  display: var(--modal--display, flex);
  background: var(--modal--background, rgba(255, 255, 255, 1));
  width: var(--modal--width, 12.500em);
  height: var(--modal--height, 18.750em);  
  padding: var(--modal--padding, 0.625em);
  border-radius: var(--modal--border-radius, 0.625em);
  border: var(--modal--border, none);
  justify-content: var(--modal--justify-content, center);
  align-items: var(--modal--align-items, unset);
}


'''

def print_scss_prop():
    for row in scss_file.split('\n'):
        if(len(row.split('var'))>1):
            prop = row.split('var')[1].split(',')[0][1::]
            default = ",".join(row.split('var')[1].split(',')[1::])[1:-2]
            print('* @prop '+prop+":  <br> Default: "+default)
print_scss_prop()