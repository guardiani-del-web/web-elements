props = ['width', 'height', 'position','left','top','padding','display','border','background','color','font-size', 'justify-content', 'align-items']

default_values = ['fit-content','100vh','fixed','0','0','10px','flex','none','rgba(255,255,255,1)','rgba(0,0,0,1)','1em','left','start']
component = 'navigation-drawer'

def print_scss_prop():
    for p,d in zip(props,default_values):
        print(p+": var(--"+component+"--"+p+", "+ d+");")
        
print_scss_prop()