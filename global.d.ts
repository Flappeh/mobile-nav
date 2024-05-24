/// <reference types="nativewind/types" />
 interface userCreate {
    email: string,
    username: string,
    password: string
}

interface userSignIn{
    email: string,
    password: string
}


// Global Provider
interface LoggedInUser {
    username: string
    email: string
    avatar: string
    accountId: string
}

interface GlobalContextType {
    isLoggedIn: boolean
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
    user: any
    setUser: any
    isLoading: boolean
}

type ContextProviderProps = {
    children?: ReactNode
}



// Custom Button Component

interface buttonProps{
    title: string,
    handlePress?: ()=> {} | undefined | null,
    containerStyles?: string,
    textStyles?: string,
    isLoading?: boolean
}

// Empty Component

interface EmptyProps{
    title: string,
    subtitle: string
}

// VideoCard Component

interface VideoProps{
    $id?: string,
    title: string,
    thumbnail?: string,
    video?: string,
    creator?: LoggedInUser
}

// FormField Component
interface FormInterface{
    title: string,
    value: string,
    placeholder?: string,
    handleChangeText?: (e: any) => any,
    otherStyles: string,
    keyboardType?: string

}

// Search Component

interface SearchInterface{
    value: string,
    placeholder?: string,
    handleChangeText?: (e: any) => any,
    otherStyles?: string,
    keyboardType?: string
}

// Video Card / Trending Component


interface PostInputProps {
    video: VideoProps
}
interface Post{
    $id: number
}

interface TrendingProps{
    video: VideoProps[]
}
