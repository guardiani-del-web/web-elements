scss_file = '''
:host {
  display: block;
  position: var(--dropdown-item--position, relative);
  cursor: var(--dropdown-item--cursor, pointer);

  .dropdown_item {
    display: var(--dropdown-item--display, flex);
    width: var(--dropdown-item--width, 200px);
    height: var(--dropdown-item--height, 30px);
    background: var(--dropdown-item--background, rgba(255, 255, 255, 1));
    color: var(--dropdown-item--color, rgba(0, 0, 0, 1));
    padding: var(--dropdown-item--padding, 10px);
    margin: var(--dropdown-item--margin, 0);
    justify-content: var(--dropdown-item--justify-content, space-between);
    align-items: var(--dropdown-item--align-items, center);

    &.margin_right {
      border-right: var(--dropdown-item--border-right, solid 2px rgba(0, 0, 0, 1)
      );
    }

    &.margin_bottom {
      border-bottom: var(--dropdown-item--border-bottom, solid 2px rgba(0, 0, 0, 1)
      );
    }

    &:hover {
      background: var(--dropdown-item--background-hover, rgb(185, 185, 185));
    }

    label {
      pointer-events: none;
    }

    .arrow {
      border: var(--dropdown-item_arrow--border, solid rgba(0, 0, 0, 1));
      padding: var(--dropdown-item_arrow--padding, 3px);
      border-width: var(--dropdown-item_arrow--border-width, 0 3px 3px 0);
      display: var(--dropdown-item_arrow--display, inline-block);
      transition: var(--dropdown-item_arrow--transition, all 0.5s);

      &.right {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
      }

      &.left {
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
      }

      &.up {
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
      }

      &.down {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
      }
    }
  }

  .children {
    position: var(--dropdown-item_children--position, absolute);
    transition: var(--dropdown-item_children--transition, all 0.5s);
    z-index: 2;

    &.position_right {
      top: var(--dropdown-item_children--top, -2px);
      left: var(--dropdown-item_children--left, 100%);
    }

    &.position_bottom {
      top: var(--dropdown-item_children--top, 100%);
      left: var(--dropdown-item_children--left, -2px);
    }

    &.position_left {
      top: var(--dropdown-item_children--top, -2px);
      right: var(--dropdown-item_children--right, 100%);
    }

    &.position_top {
      bottom: var(--dropdown-item_children--bottom, 100%);
      left: var(--dropdown-item_children--left, -2px);
    }
  }
}

'''

def print_scss_prop():
    for row in scss_file.split('\n'):
        if(len(row.split('var'))>1):
            prop = row.split('var')[1].split(',')[0][1::]
            default = ",".join(row.split('var')[1].split(',')[1::])[1:-2]
            print('* @prop '+prop+":  <br> Default: "+default)
print_scss_prop()