import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./components.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import BASE_URL from '../../config';

function Languages() {
    const [name, setName] = useState("");
    const [flagUrl, setFlagUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [editingLanguage, setEditingLanguage] = useState(null);

    useEffect(() => {
        fetchLanguages();
    }, []);

    const fetchLanguages = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/languages`);
            setLanguages(response.data);
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    const handleEdit = (language) => {
        setEditingLanguage(language);
    };

    const handleUpdate = async (updatedLanguage) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/api/languages/${updatedLanguage.id}`,
                updatedLanguage
            );
            toast.success("Language Updated successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000, // Duration in milliseconds
            });
            const updatedLanguages = languages.map((language) =>
                language.id === response.data.id ? response.data : language
            );
            setLanguages(updatedLanguages);
            setEditingLanguage(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/languages/${id}`);
            setLanguages((prevLanguages) =>
                prevLanguages.filter((language) => language.id !== id)
            );
            toast.success("Language Deleted successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000, // Duration in milliseconds
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleConfirmDelete = (languageId) => {
        confirmAlert({
            title: "Confirm Deletion",
            message: "Are you sure you want to delete this language?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => handleDelete(languageId),
                },
                {
                    label: "No",
                    onClick: () => {},
                },
            ],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Disable the create button during submission
        setIsSubmitting(true);

        // Create a new language object
        const language = {
            name: name,
            flagUrl: flagUrl,
        };

        try {
            // Send a POST request to the backend API to create the language
            const response = await axios.post(
                `${BASE_URL}/api/languages`,
                language
            );
            console.log("Language created successfully:", response.data);
            // Display flash message using react-toastify
            toast.success("Language created successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000, // Duration in milliseconds
            });
            // Clear the form after successful submission
            setName("");
            setFlagUrl("");
            // Fetch the updated list of languages
            fetchLanguages();
        } catch (error) {
            console.error("Error creating language:", error);
        } finally {
            // Enable the create button after submission
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`${styles["form-container"]}`}>
            <h2 className={`${styles.heading}`}>Set New Language</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Flag URL:
                    <input
                        type="url"
                        required
                        value={flagUrl}
                        onChange={(e) => setFlagUrl(e.target.value)}
                    />
                </label>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save"}
                </button>
            </form>
            <ToastContainer />

            <div>
                <h2 className={styles.heading}>All Languages</h2>
                <div className={styles.cardContainer}>
                    {languages.map((language) => (
                        <div className={styles.card} key={language.id}>
                            {editingLanguage && editingLanguage.id === language.id ? (
                                <div>
                                    <h3 className={styles.heading}>Edit Language</h3>
                                    <EditForm
                                        language={editingLanguage}
                                        onUpdate={handleUpdate}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <div className={styles.cardButtons}>
                                        <button
                                            className={styles.editButton}
                                            onClick={() => handleEdit(language)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() =>
                                                handleConfirmDelete(language.id)
                                            }
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                    <img src={language.flagUrl} alt={language.name} />
                                    <span>
                                        <strong>Name:</strong> {language.name}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function EditForm({ language, onUpdate }) {
    const [name, setName] = useState(language.name);
    const [flagUrl, setFlagUrl] = useState(language.flagUrl);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedLanguage = {
            id: language.id,
            name: name,
            flagUrl: flagUrl,
        };

        onUpdate(updatedLanguage);
    };

    return (
        <div className={`${styles['updateform-container']}`}>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Flag URL:
                    <input
                        type="url"
                        required
                        value={flagUrl}
                        onChange={(e) => setFlagUrl(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default Languages;
