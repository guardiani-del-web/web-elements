### print_scss_prop.py
You can use this script to translate scss from this format:
<br/>
border-radius: var(--border-radius, 0.5em);
<br/>
To this format: 
<br/>
* @prop --border-radius: Border radius of chips  <br> Default: 0.5em
</br>
To do this modify the script adding the scss you want to traslate in comments