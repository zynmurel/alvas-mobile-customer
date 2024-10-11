import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../@types/user";

export const getUser = async () => {
    try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
            const user = JSON.parse(value) as User
            return user
        } else {
            return null
        }
    } catch (e) {
        return null
    }
};