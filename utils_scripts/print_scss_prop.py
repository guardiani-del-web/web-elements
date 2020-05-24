scss_file = '''
.chips {
  display: block;
  background: var(--background, rgba(229, 229, 229, 1));
  border-radius: var(--border-radius, 0.5em);
  border-width: var(--border-width, 0.05em);
  border-color: var(--border-color, unset);
  width: var(--width, auto);
  height: var(--heigth, auto);
  padding: var(--padding, 0.25rem);
  margin: var(--margin, 0);
  display: var(--display, inline-block);

  &.selected {
    background: var(--selected-background, rgba(65, 169, 192, 1));
  }
}

.imageLeft {
  cursor: var(--imageLeft--cursor, auto);
  padding: var(--imageLeft--padding, 0);
  margin: var(--imageLeft--margin, 0 0.5rem);
  width: var(--imageLeft--width, auto);
  height: var(--imageLeft--heigth, auto);
  border-radius: var(--imageLeft--border-radius, 0em);
}

label {
  color: var(--label--color, rgba(0, 0, 0, 1));
  font-size: var(--label--font-size, 12pt);
  font-weight: var(--label--font-weight, normal);
  text-transform: var(--label--text-transform, unset);
  text-align: var(--label--text-align, left);
  padding: var(--label--padding, 0);
  margin: var(--label--margin, 0 0.5rem);
  text-decoration: var(--label--text-decoration, unset);
}

.imageRight {
  cursor: var(--imageRight--cursor, pointer);
  padding: var(--imageRight--padding, 0);
  margin: var(--imageRight--margin, 0 0.5rem);
  width: var(--imageRight--width, auto);
  height: var(--imageRight--heigth, auto);
  border-radius: var(--imageRight--border-radius, 0em);
}

'''

def print_scss_prop():
    for row in scss_file.split('\n'):
        if(len(row.split('var'))>1):
            prop = row.split('var')[1].split(',')[0][1::]
            default = "".join(row.split('var')[1].split(',')[1::])[1:-2]
            print('* @prop '+prop+":  <br> Default: "+default)
print_scss_prop()