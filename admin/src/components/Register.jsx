import { useState, useEffect, useRef } from "react";
import axios from "../axios";
import { useAuth } from "../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./components.module.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Register() {
    const { setUser, user } = useAuth();
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const formRef = useRef(null); // Reference to the form element
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`/users`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleUpdate = async (updatedUser) => {
        try {
            const response = await axios.put(
                `/users/${updatedUser.id}`,
                updatedUser
            );
            toast.success("User Updated successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000, // Duration in milliseconds
            });
            const updatedUsers = users.map((user) =>
                user.id === response.data.id ? response.data : user
            );
            setUsers(updatedUsers);
            setEditingUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/users/${id}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            toast.success("User Deleted successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000, // Duration in milliseconds
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleConfirmDelete = (UserId) => {
        confirmAlert({
            title: "Confirm Deletion",
            message: "Are you sure you want to delete this user?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => handleDelete(UserId),
                },
                {
                    label: "No",
                    onClick: () => {},
                },
            ],
        });
    };

    // register user
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { name, email, password, cpassword } = e.target.elements;
        const body = {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: cpassword.value,
        };
        try {
            const resp = await axios.post("/users", body);
            if (resp.status === 200) {
                // Display flash message using react-toastify
                toast.success("User created successfully", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000, // Duration in milliseconds
                });
                formRef.current.reset(); // Reset the form fields
                fetchUsers();
            }
        } catch (error) {
            if (error.response.status === 422) {
                console.log(error.response.data.errors);
                if (error.response.data.errors.name) {
                    setNameError(error.response.data.errors.name[0]);
                } else {
                    setNameError("");
                }
                if (error.response.data.errors.email) {
                    setEmailError(error.response.data.errors.email[0]);
                } else {
                    setEmailError("");
                }
                if (error.response.data.errors.password) {
                    setPasswordError(error.response.data.errors.password[0]);
                } else {
                    setPasswordError("");
                }
            }
        } finally {
            // Enable the create button after submission
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {user.id !== 1 && (
                <div className={`${styles["form-container"]}`}>
                    <h2 className={`${styles.heading}`}>Not Authorized</h2>
                </div>
            )}
            {user.id === 1 && (
                <div className={`${styles["form-container"]}`}>
                    <h2 className={`${styles.heading}`}>Create New Admin</h2>
                    <form onSubmit={handleSubmit} ref={formRef}>
                        <label htmlFor="name">
                            Full Name:
                            <input type="text" required name="name" id="name" />
                        </label>
                        {nameError && (
                            <p className={styles.error}>{nameError}</p>
                        )}
                        <label htmlFor="email">
                            Email:
                            <input
                                type="email"
                                required
                                name="email"
                                id="email"
                                placeholder="name@company.com"
                            />
                        </label>
                        {emailError && (
                            <p className={styles.error}>{emailError}</p>
                        )}
                        <label htmlFor="password">
                            Password:
                            <input
                                type="password"
                                required
                                name="password"
                                id="password"
                            />
                        </label>
                        {passwordError && (
                            <p className={styles.error}>{passwordError}</p>
                        )}
                        <label htmlFor="cpassword">
                            Confirm Password:
                            <input
                                type="password"
                                required
                                name="cpassword"
                                id="cpassword"
                            />
                        </label>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save"}
                        </button>
                    </form>
                    <ToastContainer />

                    <div>
                        <h2 className={styles.heading}>All Users</h2>
                        <div className={styles.cardContainer}>
                            {users &&
                                users.map((singleUser) => (
                                    <div
                                        className={styles.card}
                                        key={singleUser.id}
                                    >
                                        {editingUser &&
                                        editingUser.id === singleUser.id ? (
                                            <div>
                                                <h3 className={styles.heading}>
                                                    Edit User
                                                </h3>
                                                <EditForm
                                                    tobeEditedUser={editingUser}
                                                    onUpdate={handleUpdate}
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <div
                                                    className={
                                                        styles.cardButtons
                                                    }
                                                >
                                                    {singleUser.id === 1 && (
                                                        <button
                                                            className={
                                                                styles.editButton
                                                            }
                                                            onClick={() =>
                                                                handleEdit(
                                                                    singleUser
                                                                )
                                                            }
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    )}
                                                    {singleUser.id !== 1 && (
                                                        <button
                                                            className={
                                                                styles.deleteButton
                                                            }
                                                            onClick={() =>
                                                                handleConfirmDelete(
                                                                    singleUser.id
                                                                )
                                                            }
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    )}
                                                </div>

                                                <p>
                                                    <strong>Full Name:</strong>{" "}
                                                    {singleUser.name}
                                                </p>
                                                <p>
                                                    <strong>Email:</strong>{" "}
                                                    {singleUser.email}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function EditForm({ tobeEditedUser, onUpdate }) {
    const [formname, setFormName] = useState(tobeEditedUser.name);
    const [formemail, setFormEmail] = useState(tobeEditedUser.email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, cpassword } = e.target.elements;
        const body = {
            id: tobeEditedUser.id,
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: cpassword.value,
        };

        onUpdate(body);
    };

    return (
        <div className={`${styles["updateform-container"]}`}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Full Name:
                    <input
                        type="text"
                        required
                        name="name"
                        id="name"
                        value={formname}
                        onChange={(e) => setFormName(e.target.value)}
                    />
                </label>
                <label htmlFor="email">
                    Email:
                    <input
                        type="email"
                        required
                        name="email"
                        id="email"
                        value={formemail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="name@company.com"
                    />
                </label>
                <label htmlFor="password">
                    Password:
                    <input
                        type="password"
                        required
                        name="password"
                        id="password"
                    />
                </label>
                <label htmlFor="cpassword">
                    Confirm Password:
                    <input
                        type="password"
                        required
                        name="cpassword"
                        id="cpassword"
                    />
                </label>
                <br />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
