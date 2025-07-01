import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";

export const useSocialAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { startSSOFlow } = useSSO();

    const handleSocialAuth = async () => {
        setIsLoading(true);
        const strategy = "oauth_google";
        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy });
            if (createdSessionId && setActive) {
                await setActive({ session: createdSessionId });
            }
        } catch (err) {
            console.log("Error in social auth", err);
            const provider = "Google";
            Alert.alert("Error", `Failed to sign in with ${provider}. Please try again.`);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, handleSocialAuth };
};