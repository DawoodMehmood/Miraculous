import { useEffect, useState } from "react";
import axios from "../axios";
import styles from "./components.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateVideo() {
    const [seasonNo, setSeasonNo] = useState("");
    const [episodeNo, setEpisodeNo] = useState("");
    const [episodeTitle, setEpisodeTitle] = useState("");
    const [episodeDuration, setEpisodeDuration] = useState("");
    const [episodeType, setEpisodeType] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [thumbnailImageLink, setThumbnailImageLink] = useState("");
    const [downloadLink, setDownloadLink] = useState("");
    const [articleHeading, setArticleHeading] = useState("");
    const [articleDescription, setArticleDescription] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [languages, setLanguages] = useState([]);
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDesc, setMetaDesc] = useState("");
    const [jsCode, setJSCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get(`/languages`);
                setLanguages(response.data);
            } catch (error) {
                console.error("Error fetching languages:", error);
            }
        };

        fetchLanguages();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Disable the create button during submission
        setIsSubmitting(true);

        // Create a new video object
        const newVideo = {
            season_no: seasonNo,
            episode_no: episodeNo,
            episode_title: episodeTitle,
            episode_duration: episodeDuration,
            episode_type: episodeType,
            video_url: videoUrl,
            thumbnail_image_link: thumbnailImageLink,
            download_link: downloadLink,
            article_heading: articleHeading,
            article_description: articleDescription,
            meta_title: metaTitle,
            meta_description: metaDesc,
            language_id: selectedLanguage,
            jsCode: jsCode,
        };

        try {
            // Send a POST request to the backend API to create the video
            const response = await axios.post(
                `/videos`,
                newVideo
            );
            // Display flash message using react-toastify
            toast.success("New episode created successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000, // Duration in milliseconds
            });
            // Clear the form after successful submission
            setSeasonNo("");
            setEpisodeNo("");
            setEpisodeTitle("");
            setEpisodeDuration("");
            setEpisodeType("");
            setVideoUrl("");
            setThumbnailImageLink("");
            setDownloadLink("");
            setArticleHeading("");
            setArticleDescription("");
            setMetaTitle("");
            setMetaDesc("");
            setSelectedLanguage("");
            setJSCode("");
        } catch (error) {
            console.error("Error creating video:", error);
        } finally {
            // Enable the create button after submission
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`${styles["form-container"]}`}>
            <h2 className={`${styles.heading}`}>Create New Episode</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Meta Title:
                    <input
                        type="text"
                        required
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Meta Description:
                    <textarea
                        value={metaDesc}
                        required
                        onChange={(e) => setMetaDesc(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Language:
                    <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        required
                    >
                        <option value="">Select Language</option>
                        {languages.map((language) => (
                            <option key={language.id} value={language.id}>
                                {language.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Season No:
                    <input
                        type="number"
                        min="1"
                        required
                        value={seasonNo}
                        onChange={(e) => setSeasonNo(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Episode No:
                    <input
                        type="number"
                        min="1"
                        required
                        value={episodeNo}
                        onChange={(e) => setEpisodeNo(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Episode Title:
                    <input
                        type="text"
                        required
                        value={episodeTitle}
                        onChange={(e) => setEpisodeTitle(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Episode Duration:
                    <input
                        type="text"
                        required
                        value={episodeDuration}
                        onChange={(e) => setEpisodeDuration(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Episode Type:
                    <select
                        value={episodeType}
                        onChange={(e) => setEpisodeType(e.target.value)}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="episodes">Episodes</option>
                        <option value="news">News</option>
                        <option value="specials">Specials</option>
                        <option value="home">Home</option>
                    </select>
                </label>
                <br />
                <label>
                    Video URL:
                    <input
                        type="url"
                        required
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Thumbnail Image Link:
                    <input
                        type="url"
                        required
                        value={thumbnailImageLink}
                        onChange={(e) => setThumbnailImageLink(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Download Link:(optional)
                    <input
                        type="url"
                        value={downloadLink}
                        onChange={(e) => setDownloadLink(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Article Heading:(optional)
                    <input
                        type="text"
                        value={articleHeading}
                        onChange={(e) => setArticleHeading(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Article Description:(optional)
                    <textarea
                        value={articleDescription}
                        onChange={(e) => setArticleDescription(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    JS Code:(optional)
                    <textarea
                        value={jsCode}
                        onChange={(e) => setJSCode(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create"}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default CreateVideo;
