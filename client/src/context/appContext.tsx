import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import toast from "react-hot-toast";

// Data Interfaces
export interface BlogArticle {
    _id?: string;
    slug: string;
    category: string;
    readTime: string;
    date: string;
    title: string;
    excerpt: string;
    content: string[];
    image?: string;
}

export interface ProjectDetail {
    title: string;
    desc: string;
}

export interface PortfolioProject {
    _id?: string;
    slug: string;
    title: string;
    category: string;
    subtitle: string;
    src: string;
    client: string;
    date: string;
    overview: string;
    challenge: string;
    solution: string;
    techStack: string[];
    details: ProjectDetail[];
}

export interface TestimonialItem {
    _id?: string;
    id?: string;
    name: string;
    location: string;
    avatar: string;
    text: string;
    column?: number;
}

export interface ContactSubmission {
    _id?: string;
    id?: string;
    name: string;
    email: string;
    company: string;
    budget: string;
    projectType: string;
    message: string;
    date: string;
    status: "new" | "read" | "replied";
}

interface AppContextType {
    // Auth State & Actions
    adminToken: string | null;
    isAdminLoggedIn: boolean;
    loginAdmin: (username: string, password: string) => Promise<boolean>;
    logoutAdmin: () => void;

    // Blog Articles
    blogs: BlogArticle[];
    loadingBlogs: boolean;
    fetchBlogs: () => Promise<void>;
    addBlog: (formData: FormData | Partial<BlogArticle>) => Promise<boolean>;
    updateBlog: (id: string, formData: FormData | Partial<BlogArticle>) => Promise<boolean>;
    deleteBlog: (id: string) => Promise<boolean>;

    // Portfolio Projects
    projects: PortfolioProject[];
    loadingProjects: boolean;
    fetchProjects: () => Promise<void>;
    addProject: (formData: FormData | Partial<PortfolioProject>) => Promise<boolean>;
    updateProject: (id: string, formData: FormData | Partial<PortfolioProject>) => Promise<boolean>;
    deleteProject: (id: string) => Promise<boolean>;

    // Testimonials
    testimonials: TestimonialItem[];
    testimonialsCol1: TestimonialItem[];
    testimonialsCol2: TestimonialItem[];
    loadingTestimonials: boolean;
    fetchTestimonials: () => Promise<void>;
    addTestimonial: (formData: FormData | Partial<TestimonialItem>) => Promise<boolean>;
    updateTestimonial: (id: string, formData: FormData | Partial<TestimonialItem>) => Promise<boolean>;
    deleteTestimonial: (id: string) => Promise<boolean>;

    // Inquiries Inbox
    inquiries: ContactSubmission[];
    loadingInquiries: boolean;
    fetchInquiries: () => Promise<void>;
    submitInquiry: (data: Partial<ContactSubmission>) => Promise<boolean>;
    toggleInquiryStatus: (id: string) => Promise<boolean>;
    replyInquiry: (id: string, replyMessage: string) => Promise<boolean>;
    deleteInquiry: (id: string) => Promise<boolean>;

    // AI Chatbot
    sendChatMessage: (messages: { role: string; content: string }[]) => Promise<string>;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Auth State
    const [adminToken, setAdminToken] = useState<string | null>(localStorage.getItem("nexion_auth_token"));
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(!!localStorage.getItem("nexion_auth_token"));

    // Content States
    const [blogs, setBlogs] = useState<BlogArticle[]>([]);
    const [loadingBlogs, setLoadingBlogs] = useState<boolean>(false);

    const [projects, setProjects] = useState<PortfolioProject[]>([]);
    const [loadingProjects, setLoadingProjects] = useState<boolean>(false);

    const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
    const [loadingTestimonials, setLoadingTestimonials] = useState<boolean>(false);

    const [inquiries, setInquiries] = useState<ContactSubmission[]>([]);
    const [loadingInquiries, setLoadingInquiries] = useState<boolean>(false);

    // Filter Testimonial Columns
    const testimonialsCol1 = testimonials.filter(t => (t.column ?? 1) === 1);
    const testimonialsCol2 = testimonials.filter(t => (t.column ?? 1) === 2);

    // Verify Auth token on boot
    useEffect(() => {
        if (adminToken) {
            fetch(`${API_BASE_URL}/auth/verify`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            })
                .then(res => {
                    if (!res.ok) {
                        logoutAdmin();
                    } else {
                        setIsAdminLoggedIn(true);
                    }
                })
                .catch(() => {
                    // Silent catch if backend server offline
                });
        }
    }, [adminToken]);

    // Initial Fetch of public data
    useEffect(() => {
        fetchBlogs();
        fetchProjects();
        fetchTestimonials();
    }, []);

    // Fetch Inquiries if Admin is Logged In
    useEffect(() => {
        if (isAdminLoggedIn) {
            fetchInquiries();
        }
    }, [isAdminLoggedIn]);

    /* ─── 1. Auth Actions ──────────────────────────────────────────────── */
    const loginAdmin = async (username: string, password: string): Promise<boolean> => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem("nexion_auth_token", data.token);
                localStorage.setItem("nexion_auth", "true");
                setAdminToken(data.token);
                setIsAdminLoggedIn(true);
                toast.success("Welcome back, Admin!");
                return true;
            } else {
                toast.error(data.message || "Invalid login credentials.");
                return false;
            }
        } catch {
            toast.error("Failed to connect to backend server.");
            return false;
        }
    };

    const logoutAdmin = () => {
        localStorage.removeItem("nexion_auth_token");
        localStorage.removeItem("nexion_auth");
        setAdminToken(null);
        setIsAdminLoggedIn(false);
        setInquiries([]);
        toast.success("Logged out successfully.");
    };

    /* ─── 2. Blog Actions ──────────────────────────────────────────────── */
    const fetchBlogs = async (): Promise<void> => {
        setLoadingBlogs(true);
        try {
            const res = await fetch(`${API_BASE_URL}/blogs`);
            if (res.ok) {
                const data = await res.json();
                setBlogs(data);
            }
        } catch (err) {
            console.error("Error fetching blogs:", err);
        } finally {
            setLoadingBlogs(false);
        }
    };

    const addBlog = async (formData: FormData | Partial<BlogArticle>): Promise<boolean> => {
        try {
            const isForm = formData instanceof FormData;
            const res = await fetch(`${API_BASE_URL}/blogs`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    ...(isForm ? {} : { "Content-Type": "application/json" })
                },
                body: isForm ? formData : JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                toast.success("Blog article published!");
                fetchBlogs();
                return true;
            } else {
                toast.error(data.message || "Failed to add blog.");
                return false;
            }
        } catch {
            toast.error("Network error while adding blog.");
            return false;
        }
    };

    const updateBlog = async (id: string, formData: FormData | Partial<BlogArticle>): Promise<boolean> => {
        try {
            const isForm = formData instanceof FormData;
            const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    ...(isForm ? {} : { "Content-Type": "application/json" })
                },
                body: isForm ? formData : JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                toast.success("Blog article updated!");
                fetchBlogs();
                return true;
            } else {
                toast.error(data.message || "Failed to update blog.");
                return false;
            }
        } catch {
            toast.error("Network error while updating blog.");
            return false;
        }
    };

    const deleteBlog = async (id: string): Promise<boolean> => {
        try {
            const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            if (res.ok) {
                toast.success("Article deleted!");
                fetchBlogs();
                return true;
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to delete article.");
                return false;
            }
        } catch {
            toast.error("Network error while deleting blog.");
            return false;
        }
    };

    /* ─── 3. Portfolio Actions ──────────────────────────────────────────── */
    const fetchProjects = async (): Promise<void> => {
        setLoadingProjects(true);
        try {
            const res = await fetch(`${API_BASE_URL}/portfolio`);
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (err) {
            console.error("Error fetching portfolio:", err);
        } finally {
            setLoadingProjects(false);
        }
    };

    const addProject = async (formData: FormData | Partial<PortfolioProject>): Promise<boolean> => {
        try {
            const isForm = formData instanceof FormData;
            const res = await fetch(`${API_BASE_URL}/portfolio`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    ...(isForm ? {} : { "Content-Type": "application/json" })
                },
                body: isForm ? formData : JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                toast.success("Portfolio project created!");
                fetchProjects();
                return true;
            } else {
                toast.error(data.message || "Failed to create project.");
                return false;
            }
        } catch {
            toast.error("Network error while adding project.");
            return false;
        }
    };

    const updateProject = async (id: string, formData: FormData | Partial<PortfolioProject>): Promise<boolean> => {
        try {
            const isForm = formData instanceof FormData;
            const res = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    ...(isForm ? {} : { "Content-Type": "application/json" })
                },
                body: isForm ? formData : JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                toast.success("Portfolio project updated!");
                fetchProjects();
                return true;
            } else {
                toast.error(data.message || "Failed to update project.");
                return false;
            }
        } catch {
            toast.error("Network error while updating project.");
            return false;
        }
    };

    const deleteProject = async (id: string): Promise<boolean> => {
        try {
            const res = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            if (res.ok) {
                toast.success("Project deleted!");
                fetchProjects();
                return true;
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to delete project.");
                return false;
            }
        } catch {
            toast.error("Network error while deleting project.");
            return false;
        }
    };

    /* ─── 4. Testimonials Actions ──────────────────────────────────────── */
    const fetchTestimonials = async (): Promise<void> => {
        setLoadingTestimonials(true);
        try {
            const res = await fetch(`${API_BASE_URL}/testimonials`);
            if (res.ok) {
                const data = await res.json();
                setTestimonials(data);
            }
        } catch (err) {
            console.error("Error fetching testimonials:", err);
        } finally {
            setLoadingTestimonials(false);
        }
    };

    const addTestimonial = async (formData: FormData | Partial<TestimonialItem>): Promise<boolean> => {
        try {
            const isForm = formData instanceof FormData;
            const res = await fetch(`${API_BASE_URL}/testimonials`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    ...(isForm ? {} : { "Content-Type": "application/json" })
                },
                body: isForm ? formData : JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                toast.success("Testimonial review added!");
                fetchTestimonials();
                return true;
            } else {
                toast.error(data.message || "Failed to add testimonial.");
                return false;
            }
        } catch {
            toast.error("Network error while adding testimonial.");
            return false;
        }
    };

    const updateTestimonial = async (id: string, formData: FormData | Partial<TestimonialItem>): Promise<boolean> => {
        try {
            const isForm = formData instanceof FormData;
            const res = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    ...(isForm ? {} : { "Content-Type": "application/json" })
                },
                body: isForm ? formData : JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                toast.success("Testimonial review updated!");
                fetchTestimonials();
                return true;
            } else {
                toast.error(data.message || "Failed to update testimonial.");
                return false;
            }
        } catch {
            toast.error("Network error while updating testimonial.");
            return false;
        }
    };

    const deleteTestimonial = async (id: string): Promise<boolean> => {
        try {
            const res = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            if (res.ok) {
                toast.success("Review deleted!");
                fetchTestimonials();
                return true;
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to delete review.");
                return false;
            }
        } catch {
            toast.error("Network error while deleting testimonial.");
            return false;
        }
    };

    /* ─── 5. Inquiries Actions ─────────────────────────────────────────── */
    const fetchInquiries = async (): Promise<void> => {
        if (!adminToken) return;
        setLoadingInquiries(true);
        try {
            const res = await fetch(`${API_BASE_URL}/inquiries`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            if (res.ok) {
                const data = await res.json();
                setInquiries(data);
            }
        } catch (err) {
            console.error("Error fetching inquiries:", err);
        } finally {
            setLoadingInquiries(false);
        }
    };

    const submitInquiry = async (data: Partial<ContactSubmission>): Promise<boolean> => {
        try {
            const res = await fetch(`${API_BASE_URL}/inquiries`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await res.json();

            if (res.ok) {
                toast.success("Thank you! We will get in touch within 24 hours.", {
                    style: { borderRadius: "12px", background: "#18181b", color: "#fafafa", border: "1px solid #3f3f46" },
                    iconTheme: { primary: "#10b981", secondary: "#18181b" }
                });
                if (isAdminLoggedIn) fetchInquiries();
                return true;
            } else {
                toast.error(result.message || "Failed to send inquiry.");
                return false;
            }
        } catch {
            toast.error("Network error while submitting inquiry.");
            return false;
        }
    };

    const toggleInquiryStatus = async (id: string): Promise<boolean> => {
        try {
            const res = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            if (res.ok) {
                toast.success("Inquiry status updated.");
                fetchInquiries();
                return true;
            } else {
                toast.error("Failed to update status.");
                return false;
            }
        } catch {
            toast.error("Network error.");
            return false;
        }
    };

    const replyInquiry = async (id: string, replyMessage: string): Promise<boolean> => {
        try {
            const res = await fetch(`${API_BASE_URL}/inquiries/${id}/reply`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ replyMessage })
            });
            const data = await res.json();

            if (res.ok) {
                toast.success("Email reply sent to client!");
                fetchInquiries();
                return true;
            } else {
                toast.error(data.message || "Failed to send email reply.");
                return false;
            }
        } catch {
            toast.error("Network error while sending reply.");
            return false;
        }
    };

    const deleteInquiry = async (id: string): Promise<boolean> => {
        try {
            const res = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            if (res.ok) {
                toast.success("Inquiry deleted!");
                fetchInquiries();
                return true;
            } else {
                toast.error("Failed to delete inquiry.");
                return false;
            }
        } catch {
            toast.error("Network error while deleting inquiry.");
            return false;
        }
    };

    /* ─── 6. AI Chatbot Action ─────────────────────────────────────────── */
    const sendChatMessage = async (messages: { role: string; content: string }[]): Promise<string> => {
        try {
            const res = await fetch(`${API_BASE_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages })
            });
            const data = await res.json();
            if (res.ok && data.reply) {
                return data.reply;
            }
            return data.message || "I am currently unable to process your request. Please try again shortly.";
        } catch {
            return "Unable to connect to the assistant server. Please check your internet connection.";
        }
    };

    return (
        <AppContext.Provider
            value={{
                adminToken,
                isAdminLoggedIn,
                loginAdmin,
                logoutAdmin,

                blogs,
                loadingBlogs,
                fetchBlogs,
                addBlog,
                updateBlog,
                deleteBlog,

                projects,
                loadingProjects,
                fetchProjects,
                addProject,
                updateProject,
                deleteProject,

                testimonials,
                testimonialsCol1,
                testimonialsCol2,
                loadingTestimonials,
                fetchTestimonials,
                addTestimonial,
                updateTestimonial,
                deleteTestimonial,

                inquiries,
                loadingInquiries,
                fetchInquiries,
                submitInquiry,
                toggleInquiryStatus,
                replyInquiry,
                deleteInquiry,

                sendChatMessage
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
};
