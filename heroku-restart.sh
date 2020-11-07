echo "Restarting freecodecamp-projects-ns574 ..."
echo
heroku ps:restart --app freecodecamp-projects-ns574
echo
echo "local:  $(cat .git/refs/remotes/origin/master)"
echo "github: $(curl -s https://api.github.com/repos/nickstanley574/freeCodeCampProjects/git/refs/heads/master | jq -r .object.sha)"
sleep 5
echo "live:   $(curl -s https://freecodecamp-projects-ns574.herokuapp.com/sha)"
echo
echo "https://freecodecamp-projects-ns574.herokuapp.com"
echo
echo "Done."