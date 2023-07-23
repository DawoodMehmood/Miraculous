import { useState } from "react";
import axios from "../axios";
import styles from "./components.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GeneralMeta() {
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDesc, setMetaDesc] = useState("");
    const [teleURL, setTeleURL] = useState("");
    const [twitchURL, setTwitchURL] = useState("");
    const [jsCode, setJSCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Disable the create button during submission
        setIsSubmitting(true);

        // Create a new meta data object
        const metaData = {
            metaTitle: metaTitle,
            metaDesc: metaDesc,
            twitchLink: twitchURL,
            teleLink: teleURL,
            jsCode: jsCode,
        };

        try {
            // Send a POST request to the backend API to create the meta data
            const response = await axios.post(
                `/meta`,
                metaData
            );
            // Display flash message using react-toastify
            toast.success("Meta Data saved successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000, // Duration in milliseconds
            });
            // Clear the form after successful submission
            setMetaTitle("");
            setMetaDesc("");
            setTeleURL("");
            setTwitchURL("");
            setJSCode("");
        } catch (error) {
            console.error("Error creating meta data:", error);
        } finally {
            // Enable the create button after submission
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`${styles["form-container"]}`}>
            <h2 className={`${styles.heading}`}>Set Meta Data</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Telegram URL:
                    <input
                        type="url"
                        required
                        value={teleURL}
                        onChange={(e) => setTeleURL(e.target.value)}
                        placeholder="Hint: https://t.me/plaggzworld"
                    />
                </label>
                <label>
                    Twitch Embedding URL: (optional)
                    <input
                        type="url"
                        value={twitchURL}
                        onChange={(e) => setTwitchURL(e.target.value)}
                        placeholder="Hint: https://player.twitch.tv/?channel=mymiraculousto&parent=hub.miraculous.to&parent=www.hub.miraculous.to&autoplay=true"
                    />
                </label>
                <label>
                    Meta Title:
                    <input
                        type="text"
                        required
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                    />
                </label>
                <label>
                    Meta Description:
                    <textarea
                        required
                        value={metaDesc}
                        onChange={(e) => setMetaDesc(e.target.value)}
                    />
                </label>
                <label>
                    JS Code: (optional)
                    <textarea
                        value={jsCode}
                        onChange={(e) => setJSCode(e.target.value)}
                    />
                </label>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save"}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default GeneralMeta;
