import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";
export const config = {
    endpoint: "https://appwrite.flappeh.my.id/v1",
    platform: "com.flappeh.aora",
    projectId: "66490922003b3b22a5d1",
    databaseId: "664912c5002c579f433b",
    userCollectionId: "66491307000951aa8017",
    videoCollectionId: "6649131600230f284423",
    storageId: "664a50f80027b5871dca",
};

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client)
const databases = new Databases(client);


export const createUser = async ({email, username, password}: userCreate) => {
    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if(!newAccount) throw Error("Error on user creation")
        
        const avatarUrl = avatars.getInitials(username);
        await signIn({email, password})
        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                avatar: avatarUrl,
                username: username 
            }
        )
        return newUser

    }
    catch(err){
        console.log(err)
        throw Error("Error on user creation")
    }
}


export const signIn = async ({email, password}: userSignIn) => {
    try{
        const session = await account.createEmailPasswordSession(email, password)
        return session;
    }
    catch(err){
        console.log(err)
        throw Error(`Error occured on user : ${email} sign in process`)
    }
}


export const getCurrentUser = async () => {
    try{
        const currentAccount = await account.get();
        if(!currentAccount) throw Error
        
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error
        console.log(currentUser.documents[0])
        return currentUser.documents[0]
    }
    catch(err){
        throw Error("Error on retrieving user data")
    }
}