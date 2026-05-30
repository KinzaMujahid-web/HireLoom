import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const EditProfileModal = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname, 
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.join(", ") || "",

        location: user?.profile?.location || "",
        experience: user?.profile?.experience || "",
        degree: user?.profile?.education?.degree || "",
        institute: user?.profile?.education?.institute || "",
        passingYear:
            user?.profile?.education?.passingYear || "",

        file: null,
    });


    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleFileChange = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);

        formData.append("location", input.location);
        formData.append("experience", input.experience);
        formData.append("degree", input.degree);
        formData.append("institute", input.institute);
        formData.append("passingYear", input.passingYear);


        if (
            input.file &&
            typeof input.file !== "string"
        ) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(
                `${USER_API_ENDPOINT}/profile/update`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                dispatch(setUser({ ...res.data.user, skills: input.skills }));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(
                "Failed to Update profile"
            );
        } finally {
            setLoading(false);
        }
        setOpen(false);

        console.log(input);
    };

    const FileChangehandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    return (
        <div>
            <Dialog open={open}>
                <DialogContent
                    className="sm:max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto rounded-2xl p-0"
                    onInteractOutside={() => setOpen(false)}
                >
                    {/* HEADER */}
                    <div className="bg-black text-white px-6 py-5 rounded-t-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-bold">
                                Edit Profile
                            </DialogTitle>

                            <p className="text-gray-300 mt-2 text-sm">
                                Update your profile information
                            </p>
                        </DialogHeader>
                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={handleFileChange}
                        className="p-6"
                    >
                        <div className="space-y-5">

                            {/* NAME */}
                            <div>
                                <Label
                                    htmlFor="name"
                                    className="mb-2 block font-medium"
                                >
                                    Full Name
                                </Label>

                                <input
                                    type="text"
                                    id="name"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* EMAIL */}
                            <div>
                                <Label
                                    htmlFor="email"
                                    className="mb-2 block font-medium"
                                >
                                    Email Address
                                </Label>

                                <input
                                    type="email"
                                    id="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* PHONE */}
                            <div>
                                <Label
                                    htmlFor="phone"
                                    className="mb-2 block font-medium"
                                >
                                    Phone Number
                                </Label>

                                <input
                                    type="tel"
                                    id="phone"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* BIO */}
                            <div>
                                <Label
                                    htmlFor="bio"
                                    className="mb-2 block font-medium"
                                >
                                    Bio
                                </Label>

                                <textarea
                                    id="bio"
                                    value={input.bio}
                                    name="bio"
                                    rows={4}
                                    onChange={changeEventHandler}
                                    className="w-full border border-gray-300 rounded-xl p-3 outline-none resize-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* SKILLS */}
                            <div>
                                <Label
                                    htmlFor="skills"
                                    className="mb-2 block font-medium"
                                >
                                    Skills
                                </Label>

                                <input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    placeholder="React, Node.js, MongoDB"
                                    className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* LOCATION */}
                            <div>
                                <Label
                                    htmlFor="location"
                                    className="mb-2 block font-medium"
                                >
                                    Location
                                </Label>

                                <input
                                    type="text"
                                    id="location"
                                    value={input.location}
                                    name="location"
                                    onChange={changeEventHandler}
                                    className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* EXPERIENCE */}
                            <div>
                                <Label
                                    htmlFor="experience"
                                    className="mb-2 block font-medium"
                                >
                                    Experience
                                </Label>

                                <input
                                    type="text"
                                    id="experience"
                                    value={input.experience}
                                    name="experience"
                                    onChange={changeEventHandler}
                                    placeholder="2 Years"
                                    className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* DEGREE */}
                            <div>
                                <Label
                                    htmlFor="degree"
                                    className="mb-2 block font-medium"
                                >
                                    Degree
                                </Label>

                                <input
                                    type="text"
                                    id="degree"
                                    value={input.degree}
                                    name="degree"
                                    onChange={changeEventHandler}
                                    className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* INSTITUTE */}
                            <div>
                                <Label
                                    htmlFor="institute"
                                    className="mb-2 block font-medium"
                                >
                                    Institute
                                </Label>

                                <input
                                    type="text"
                                    id="institute"
                                    value={input.institute}
                                    name="institute"
                                    onChange={changeEventHandler}
                                    className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* PASSING YEAR */}
                            <div>
                                <Label
                                    htmlFor="passingYear"
                                    className="mb-2 block font-medium"
                                >
                                    Passing Year
                                </Label>

                                <input
                                    type="number"
                                    id="passingYear"
                                    value={input.passingYear}
                                    name="passingYear"
                                    onChange={changeEventHandler}
                                    className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>


                            {/* RESUME */}
                            <div>
                                <Label
                                    htmlFor="file"
                                    className="mb-2 block font-medium"
                                >
                                    Upload Resume
                                </Label>

                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    accept=".pdf"
                                    onChange={FileChangehandler}
                                    className="w-full border border-gray-300 rounded-xl p-3"
                                />

                                {input.file && (
                                    <p className="text-sm text-green-600 mt-2">
                                        {input.file.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <DialogFooter className="mt-8">
                            {loading ? (
                                <Button className="w-full py-6 rounded-xl bg-black text-white">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full py-6 rounded-xl bg-black hover:bg-gray-800 text-white"
                                >
                                    Save Changes
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default EditProfileModal;


