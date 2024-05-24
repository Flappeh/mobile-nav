import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const config = {
    endpoint: "https://appwrite.flappeh.my.id/v1",
    platform: "com.flappeh.aora",
    projectId: "664dd7b40010c14edacb",
    databaseId: "664dd86a001621a53706",
    userCollectionId: "664dd93a001e862dd2a8",
    videoCollectionId: "664dd933001385e4b129",
    storageId: "664dd8bb0038ebf20263",
};




// export const config = {
//     endpoint: "http://192.168.18.221:8080/v1",
//     platform: "com.flappeh.aora",
//     projectId: "664cfb7b0030fbc2aa98",
//     storageId: "664cfc10002bb3fdf3a7",
//     databaseId: "664cfbff00074e670600",
//     userCollectionId: "664cfc4800215058bb02",
//     videoCollectionId: "664cfca00014036a620d",
// };

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

export const getAllPosts = async () => {
    try{
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
        )
        return posts.documents
    }
    catch(err){
        console.log(err)
        throw Error('Error retrieving posts')
    }
}

export const getLatestPosts = async () => {
    try{
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt'),Query.limit(7)]
        )
        return posts.documents
    }
    catch(err){
        console.log(err)
        throw Error('Error retrieving posts')
    }
}
