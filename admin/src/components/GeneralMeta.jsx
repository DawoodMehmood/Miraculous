import { useState } from "react";
import axios from "axios";
import styles from "./components.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from '../../config';

function GeneralMeta() {
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDesc, setMetaDesc] = useState("");
    const [faviconURL, setFaviconURL] = useState("");
    const [teleURL, setTeleURL] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Disable the create button during submission
        setIsSubmitting(true);

        // Create a new meta data object
        const metaData = {
            meta_title: metaTitle,
            description: metaDesc,
            favicon: faviconURL,
            link: teleURL,
        };

        try {
            // Send a POST request to the backend API to create the meta data
            const response = await axios.post(
                `${BASE_URL}/api/meta`,
                metaData
            );
            console.log("Meta Data created successfully:", response.data);
            // Display flash message using react-toastify
            toast.success("Meta Data saved successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000, // Duration in milliseconds
            });
            // Clear the form after successful submission
            setMetaTitle("");
            setMetaDesc("");
            setFaviconURL("");
            setTeleURL("");
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
                    Favicon URL: (optional)
                    <input
                        type="url"
                        value={faviconURL}
                        onChange={(e) => setFaviconURL(e.target.value)}
                        placeholder="Note: It appears in browser tab"
                    />
                </label>
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
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save"}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default GeneralMeta;
