props = ['width', 'height', 'padding','margin','display','border','border-radius','background','cursor','color','text-align','font-size','text-decoration']

default_values = ['auto','auto','0.125em','0','block','none','0','(211, 211, 211, 1)','auto','(0, 0, 0, 1)','center','1em','none']
component = 'button'

def print_scss_prop():
    for p,d in zip(props,default_values):
        print(p+": var(--"+component+"--"+p+", "+ d+");")
        
print_scss_prop()