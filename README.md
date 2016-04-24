loggy is a dead-simple utility to create log entries for yourself, organized by week. (e.g. 2016_W17_Apr.log)

Entries are timestamped
    
    Fri 03:14pm: saved the world
    Fri 03:15pm: nevermind...

# usage

make sure you have node.js and npm installed

    cd ~
    git clone https://github.com/deegles/loggy.git
    cd loggy
    npm install
    cd ~

add the below alias to your shell (.profile, .bashrc or .zshrc). 

    alias log='~/loggy/loggy.js'
    
reload your profile

    source ~/.profile
    
start logging!

    log hello yes this is log
    # you can also pipe things!
    echo Did something important today! | log
    
logs will be located at ~/loggyLogs