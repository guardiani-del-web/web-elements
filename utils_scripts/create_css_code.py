props = ['width', 'height','padding','display','border','background','color','font-size', 'justify-content', 'align-items']

default_values = ['100%','3.125em','0.625em','flex','none','rgba(255,255,255,1)','rgba(0,0,0,1)','1em','left','start']
component = ''

def print_scss_prop():
    for p,d in zip(props,default_values):
        print(p+": var(--"+component+"--"+p+", "+ d+");")
        
print_scss_prop()