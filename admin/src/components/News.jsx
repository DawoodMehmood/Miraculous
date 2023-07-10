import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import styles from "./components.module.css";
import BASE_URL from "../../config";

function News() {
    const [episodes, setEpisodes] = useState([]);
    const [editingEpisode, setEditingEpisode] = useState(null);
    const [languageNames, setLanguageNames] = useState({});

    useEffect(() => {
        const fetchLanguageNames = async (episodes) => {
            try {
                const languageIds = episodes.map((episode) => episode.language_id);
                const uniqueLanguageIds = [...new Set(languageIds)];

                const languageNamesData = await Promise.all(
                    uniqueLanguageIds.map((id) => fetchLanguageName(id))
                );

                const languageNamesMap = {};
                languageNamesData.forEach((languageName, index) => {
                    const languageId = uniqueLanguageIds[index];
                    languageNamesMap[languageId] = languageName;
                });

                setLanguageNames(languageNamesMap);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchLanguageName = async (id) => {
            try {
                const response = await axios.get(`${BASE_URL}/api/languages/${id}`);
                return response.data.name;
            } catch (error) {
                console.error(error);
                return "Unknown Language";
            }
        };

        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/videos`);
                const filteredEpisodes = response.data.filter(
                    (video) => video.episode_type === "news"
                );
                setEpisodes(filteredEpisodes);
                fetchLanguageNames(filteredEpisodes);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    const handleEdit = (episode) => {
        setEditingEpisode(episode);
    };

    const handleUpdate = async (updatedEpisode) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/api/videos/${updatedEpisode.id}`,
                updatedEpisode
            );
            toast.success("Episode Updated successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000, // Duration in milliseconds
            });
            const updatedEpisodes = episodes.map((episode) =>
                episode.id === response.data.id ? response.data : episode
            );
            setEpisodes(updatedEpisodes);
            setEditingEpisode(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/videos/${id}`);
            setEpisodes((prevEpisodes) =>
                prevEpisodes.filter((episode) => episode.id !== id)
            );
            toast.success("Episode Deleted successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000, // Duration in milliseconds
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleConfirmDelete = (episodeId) => {
        confirmAlert({
            title: "Confirm Deletion",
            message: "Are you sure you want to delete this episode?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => handleDelete(episodeId),
                },
                {
                    label: "No",
                    onClick: () => {},
                },
            ],
        });
    };

    return (
        <div>
            <h2 className={styles.heading}>News</h2>
            <div className={styles.cardContainer}>
                {episodes.map((episode) => (
                    <div className={styles.card} key={episode.id}>
                        {editingEpisode && editingEpisode.id === episode.id ? (
                            <div>
                                <h3 className={styles.heading}>Edit Episode</h3>
                                <EditForm
                                    episode={editingEpisode}
                                    onUpdate={handleUpdate}
                                />
                            </div>
                        ) : (
                            <div>
                                <div className={styles.cardButtons}>
                                    <button
                                        className={styles.editButton}
                                        onClick={() => handleEdit(episode)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() =>
                                            handleConfirmDelete(episode.id)
                                        }
                                    >
                                        <FaTrash />
                                    </button>
                                    <ToastContainer />
                                </div>
                                <p>
                                    <strong>Meta Title:</strong>{" "}
                                    {episode.meta_title}
                                </p>
                                <p>
                                    <strong>Meta Description:</strong>{" "}
                                    {episode.meta_description}
                                </p>
                                <p>
                                    <strong>Language:</strong>{" "}
                                    {languageNames[episode.language_id]}
                                </p>
                                <p>
                                    <strong>Season No:</strong>{" "}
                                    {episode.season_no}
                                </p>
                                <p>
                                    <strong>Episode No:</strong>{" "}
                                    {episode.episode_no}
                                </p>
                                <p>
                                    <strong>Episode Title:</strong>{" "}
                                    {episode.episode_title}
                                </p>
                                <p>
                                    <strong>Episode Duration:</strong>{" "}
                                    {episode.episode_duration}
                                </p>
                                <p>
                                    <strong>Episode Type:</strong>{" "}
                                    {episode.episode_type}
                                </p>
                                <p>
                                    <strong>Video URL:</strong>{" "}
                                    {episode.video_url}
                                </p>
                                <p>
                                    <strong>Thumbnail Image Link:</strong>{" "}
                                    {episode.thumbnail_image_link}
                                </p>
                                <p>
                                    <strong>Download Link:</strong>{" "}
                                    {episode.download_link}
                                </p>
                                <p>
                                    <strong>Article Heading:</strong>{" "}
                                    {episode.article_heading}
                                </p>
                                <p>
                                    <strong>Article Description:</strong>{" "}
                                    {episode.article_description}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function EditForm({ episode, onUpdate }) {
    const [metaTitle, setMetaTitle] = useState(episode.meta_title);
    const [metaDesc, setMetaDesc] = useState(episode.meta_description);
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(
        episode.language_id
    );
    const [seasonNo, setSeasonNo] = useState(episode.season_no);
    const [episodeNo, setEpisodeNo] = useState(episode.episode_no);
    const [episodeTitle, setEpisodeTitle] = useState(episode.episode_title);
    const [episodeDuration, setEpisodeDuration] = useState(
        episode.episode_duration
    );
    const [episodeType, setEpisodeType] = useState(episode.episode_type);
    const [videoUrl, setVideoUrl] = useState(episode.video_url);
    const [thumbnailImageLink, setThumbnailImageLink] = useState(
        episode.thumbnail_image_link
    );
    const [downloadLink, setDownloadLink] = useState(episode.download_link);
    const [articleHeading, setArticleHeading] = useState(
        episode.article_heading
    );
    const [articleDescription, setArticleDescription] = useState(
        episode.article_description
    );

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/languages`);
                setLanguages(response.data);

                // Find the language object with the matching language_id
                const selectedLanguageObject = response.data.find(
                    (language) => language.id === episode.language_id
                );

                // Set the language name as the initial value of the language selector
                setSelectedLanguage(
                    selectedLanguageObject ? selectedLanguageObject.id : ""
                );
            } catch (error) {
                console.error(error);
            }
        };

        fetchLanguages();
    }, [episode.language_id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedEpisode = {
            id: episode.id,
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
        };

        onUpdate(updatedEpisode);
    };

    return (
        <div className={`${styles["updateform-container"]}`}>
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
                <label>
                    Meta Description:
                    <textarea
                        value={metaDesc}
                        required
                        onChange={(e) => setMetaDesc(e.target.value)}
                    />
                </label>
                <label>
                    Language:
                    <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        required
                    >
                        {languages.map((language) => (
                            <option key={language.id} value={language.id}>
                                {language.name}
                            </option>
                        ))}
                    </select>
                </label>
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
                        required
                        min="1"
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
                    Download Link:
                    <input
                        type="url"
                        value={downloadLink}
                        onChange={(e) => setDownloadLink(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Article Heading:
                    <input
                        type="text"
                        value={articleHeading}
                        onChange={(e) => setArticleHeading(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Article Description:
                    <textarea
                        value={articleDescription}
                        onChange={(e) => setArticleDescription(e.target.value)}
                    ></textarea>
                </label>
                <br />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default News;
