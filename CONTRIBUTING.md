# Contribution Rules📚:

- You are allowed to make more than one pull request. We'll merge surely merge the perfect ones :)
- Do NOT remove other content.
- Styling/code can be pretty, ugly or stupid, big or small as long as it works 😉
- Make sure your create a separate branch before opening a PR.
- Try to keep pull requests small to minimize merge conflicts

## Getting Started 🤩🤗:

- Fork the repository
- Clone the repository.
```bash
git clone https://github.com/sristy17/MindDrive.git
```

- Install the dependencies
```bash
npm install
```

()
- Add an `.env` file in the root directory.
```bash
DB_USER=<mongodb-db-user>
DB_PASSWORD=<db-password>
DB_APPNAME=<db-appname>

GEMINI_API_ENDPOINT=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent
GEMINI_API_KEY=<gemini-api-key>
```

- Start the application
```bash
npm run dev
```
- Create a new branch for your contribution: 
```bash
git checkout -b your-username
```
- Make your changes and commit them: 
```bash 
git commit -m "Added a New Feature"
```
- Push your changes to your fork: 
```bash
git push origin your-username
```
- Create a Pull Request to the `main` repository!
- **Get your PR merged 🚀**

<br>

## Avoid Conflicts {Syncing your fork}

An easy way to avoid conflicts is to add an 'upstream' for your git repo, as other PR's may be merged while you're working on your branch/fork.   

```bash
git remote add upstream https://github.com/sristy17/MindDrive/
```

You can verify that the new remote has been added by typing
```bash
git remote -v
```

To pull any new changes from your parent repository simply run
```bash
git merge upstream/main
```

This will give you any eventual conflicts and allow you to easily solve them in your repo. It's a good idea to use it frequently in between your own commits to make sure that your repo is up to date with its parent.
