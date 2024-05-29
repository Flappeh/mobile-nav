import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

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
const storage = new Storage(client);

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
            [Query.orderDesc('$createdAt')]
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
            [Query.orderDesc('$createdAt'),Query.limit(5)]
        )
        return posts.documents
    }
    catch(err){
        console.log(err)
        throw Error('Error retrieving posts')
    }
}

export const searchPosts = async (query: any) => {
    try{
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.contains('title', query)]
        )
        return posts.documents
    }
    catch(err){
        console.log(err)
        throw Error('Error retrieving posts')
    }
}

export const getUserPosts = async (userID: string) => {
    try{
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.equal('creator', userID)]
        )
        return posts.documents
    }
    catch(err){
        console.log(err)
        throw Error('Error retrieving posts')
    }
}

export const signOut = async () => {
    try{
        const session = await account.deleteSession('current')
        return session
    }
    catch(err){
        throw Error(err as string)
    }
}

export const uploadVideo = async (form:any) => {
    try{
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])
        const newPost = await databases.createDocument(
            config.databaseId,
            config.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
        )
        return newPost;
    }
    catch(err){
        throw new Error(err)
    }
}

export const uploadFile = async (file: any, type: any)=>{
    if (!file) return;
    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri

    };
    try{
        const uploadedFile = await storage.createFile(
            config.storageId,
            ID.unique(),
            asset
        );
        const fileUrl = await getFilePreview(uploadedFile.$id, type)
        return fileUrl
    }catch(err){
        throw new Error(err)
    }
}

export const getFilePreview = (fileId: string, type: string) => {
    let fileUrl;
    try {
        if(type === 'video'){
            fileUrl = storage.getFileView(config.storageId, fileId)
        }else if (type === 'image'){
            fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, 'top', 100)
        }else{
            throw new Error('Invalid file type')
        }
        if(!fileUrl) throw Error;
        return fileUrl;
    }
    catch (error) {
        throw new Error(error)
    }
}