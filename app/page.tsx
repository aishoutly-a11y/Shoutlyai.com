"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import IndustrySection from "@/components/IndustrySection";
import PricingSection from "@/components/PricingSection";
import { CheckCircle, ArrowRight, Star, Zap, RefreshCcw } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import { useEffect } from "react";
import HeroPremium from "@/components/home1section";

import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaYoutube,
    FaTiktok,
    FaPinterest,
    FaSnapchatGhost,
    FaRedditAlien,
    FaTelegramPlane,
    FaWhatsapp,
    FaDiscord,
} from "react-icons/fa";
import AIPapersSection from "@/components/AIPapersSection";

export default function LandingPage() {
    const icons = [
        FaFacebookF,
        FaInstagram,
        FaTwitter,
        FaLinkedinIn,
        FaYoutube,
        FaTiktok,
        FaPinterest,
        FaSnapchatGhost,
        FaRedditAlien,
        FaTelegramPlane,
        FaWhatsapp,
        FaDiscord,
    ];
    function more(id, id2, id3) {
        document.getElementById(id).style.display = "block";
        document.getElementById(id).style.animationDuration = "2s";
        document.getElementById(id2).style.display = "none";
        document.getElementById(id3).style.display = "block";
    }
    function less(id, id2, id3) {
        document.getElementById(id).style.display = "none";
        document.getElementById(id).style.animationDuration = "2s";
        document.getElementById(id2).style.display = "block";
        document.getElementById(id3).style.display = "none";
    }
    const socials = [
        { icon: <FaTwitter />, label: "Twitter" },
        { icon: <FaInstagram />, label: "Instagram" },
        { icon: <FaLinkedinIn />, label: "LinkedIn" },
        { icon: <FaFacebookF />, label: "Facebook" },
        { icon: <FaYoutube />, label: "YouTube" },
    ];
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleVideo = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState<string>("");
    const [subIndustries, setSubIndustries] = useState<any[]>([]);
    const [images, setImages] = useState<any[]>([]);
    const [etag, setEtag] = useState<string | null>(null);
    const [loadingImages, setLoadingImages] = useState(false);

    const [industries, setIndustries] = useState<any[]>([]);
    const [loadingIndustries, setLoadingIndustries] = useState(true);
    const [selectedSubIndustry, setSelectedSubIndustry] = useState<
        string | null
    >(null);
    const refreshImages = async () => {
        setLoadingImages(true);

        try {
            let url =
                "https://ai-shoutly-backend.onrender.com/api/display-images";
            if (selectedIndustry) {
                url += `?industryId=${selectedIndustry}`;
            }

            // Reset cache so backend returns new random images
            setEtag(null);

            const res = await fetch(url);
            const data = await res.json();

            let imagesArray: any[] = [];

            if (Array.isArray(data)) {
                imagesArray = data;
            } else if (Array.isArray(data.images)) {
                imagesArray = data.images;
            } else if (Array.isArray(data.data)) {
                imagesArray = data.data;
            }

            setImages(imagesArray);
        } catch (error) {
            console.error("Refresh failed:", error);
        } finally {
            setLoadingImages(false);
        }
    };
    useEffect(() => {
        const fetchImages = async () => {
            setLoadingImages(true);

            try {
                let url =
                    "https://ai-shoutly-backend.onrender.com/api/display-images";
                if (selectedIndustry) {
                    url += `?industryId=${selectedIndustry}`;
                }

                const res = await fetch(url);
                const data = await res.json();

                console.log("Images API response:", data);

                // Normalize response
                let imagesArray: any[] = [];

                if (Array.isArray(data)) {
                    imagesArray = data;
                } else if (Array.isArray(data.images)) {
                    imagesArray = data.images;
                } else if (Array.isArray(data.data)) {
                    imagesArray = data.data;
                }

                setImages(imagesArray);
            } catch (error) {
                console.error("Failed to fetch images:", error);
            } finally {
                setLoadingImages(false);
            }
        };

        fetchImages();
    }, [selectedIndustry]);
    // store selected industry id or name
    const [searchTerm, setSearchTerm] = useState(""); // store search input
    // Filter images locally based on search input
    const filteredImages = images.filter((img) => {
        if (!searchTerm) return true;
        return (
            img.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            img.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
    useEffect(() => {
        const fetchIndustries = async () => {
            try {
                const res = await fetch(
                    "https://ai-shoutly-backend.onrender.com/api/industries/with-subindustries",
                );

                const data = await res.json();
                console.log("API response:", data);

                // Normalize API response
                const industriesArray = Array.isArray(data)
                    ? data
                    : data?.industries || data?.data || [];

                const formatted = industriesArray.map((ind: any) => ({
                    id: ind.id,
                    name: ind.name,
                    subIndustries: ind.subIndustries || [],
                }));

                setIndustries(formatted);
            } catch (error) {
                console.error("Industry fetch failed:", error);
            } finally {
                setLoadingIndustries(false);
            }
        };

        fetchIndustries();
    }, []);
    console.log("Industries state:", industries);
    return (
        <div className="relative bg-white dark:bg-gray-950 font-arial min-h-screen text-gray-900 dark:text-white selection:text-white overflow-hidden">
            {/* GLOBAL FLOATING AI + SOCIAL MEDIA BUBBLES */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {icons.map((Icon, i) => {
                    const startX = Math.random() * 100;
                    const startY = Math.random() * 100;

                    return (
                        <div key={i} className="absolute">
                            <div className="text-gray-400/30 text-2xl md:text-3xl bg-white/40 backdrop-blur-md p-4 rounded-full shadow-lg">
                                <Icon />
                            </div>
                        </div>
                    );
                })}

                {/* AI SPARK BUBBLES */}
                {[...Array(10)].map((_, i) => (
                    <div className="absolute">
                        <div className="p-3 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-500/30 backdrop-blur-md">
                            <SparklesIcon className="w-6 h-6 text-purple-500/40" />
                        </div>
                    </div>
                ))}
            </div>
            <section className="py-14 sm:py-24 bg-white text-black overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {/* Floating Badge */}
                    <div className="flex justify-center mb-5 sm:mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs sm:text-sm font-semibold shadow-lg">
                            <span>3 Simple Steps</span>
                        </div>
                    </div>

                    {/* Title Reveal Animation */}
                    <div className="text-2xl sm:text-3xl md:text-5xl text-center mb-3 sm:mb-4">
                        Generate Your Year of Content
                    </div>

                    {/* Subtitle */}
                    <div className="text-center text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-10 sm:mb-16 px-2">
                        One prompt, 365 days of posts. Including local festivals
                        & events.
                    </div>

                    {/* Cards Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                        {/* CARD 1 */}
                        <div className="border border-gray-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm relative overflow-hidden">
                            {/* AI scanning light */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                            <div className="flex items-center gap-3 mb-5 sm:mb-6">
                                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-semibold">
                                    1
                                </span>
                                <h3 className="text-lg sm:text-xl font-semibold">
                                    Select your industry
                                </h3>
                            </div>
                            <select
                                value={selectedIndustry}
                                onChange={(e) => {
                                    const id = e.target.value;
                                    setSelectedIndustry(id);

                                    const selected = industries.find(
                                        (ind: any) =>
                                            String(ind.id) === String(id),
                                    );

                                    setSubIndustries(
                                        selected?.subIndustries || [],
                                    );
                                }}
                                className="w-full mb-6 sm:mb-8 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                            >
                                <option value="">Choose your industry</option>

                                {loadingIndustries ? (
                                    <option>Loading industries...</option>
                                ) : (
                                    industries.map((industry: any) => (
                                        <option
                                            key={industry.id}
                                            value={industry.id}
                                        >
                                            {industry.name}
                                        </option>
                                    ))
                                )}
                            </select>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                                {subIndustries.length === 0 ? (
                                    <p className="text-sm text-gray-500 col-span-full text-center">
                                        Select an industry to see sub-categories
                                    </p>
                                ) : (
                                    subIndustries.map((sub, i) => {
                                        const isActive =
                                            selectedSubIndustry ===
                                            String(sub.id);

                                        return (
                                            <div
                                                key={sub.id || i}
                                                onClick={() =>
                                                    setSelectedSubIndustry(
                                                        String(sub.id),
                                                    )
                                                }
                                                className={`group cursor-pointer relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-5 border transition-all duration-300
                    ${
                        isActive
                            ? "border-black bg-gray-50 shadow-lg scale-[1.02]"
                            : "border-gray-200 bg-white hover:shadow-xl hover:-translate-y-1"
                    }`}
                                            >
                                                {/* Gradient hover glow */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-purple-100/40 via-transparent to-blue-100/40" />

                                                {/* Icon bubble */}
                                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2 sm:mb-3 mx-auto group-hover:bg-black group-hover:text-white transition">
                                                    <span className="text-xs sm:text-sm">
                                                        {i + 1}
                                                    </span>
                                                </div>

                                                {/* Sub industry name */}
                                                <span className="text-xs sm:text-sm text-center block text-gray-800 group-hover:text-black">
                                                    {sub.name}
                                                </span>

                                                {/* Active indicator */}
                                                {isActive && (
                                                    <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-black" />
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* CARD 2 */}
                        <div className="border border-gray-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm bg-gray-100 relative overflow-hidden">
                            {/* subtle animated glow */}
                            <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-300 rounded-full blur-3xl opacity-30" />

                            <div className="flex items-center gap-3 mb-5 sm:mb-6">
                                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-semibold">
                                    2
                                </span>
                                <h3 className="text-lg sm:text-xl font-semibold">
                                    Describe Your Brand (the prompt)
                                </h3>
                            </div>

                            <textarea
                                className="w-full min-h-[140px] sm:min-h-[180px] p-4 bg-white rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black resize-none text-sm sm:text-base mb-4"
                                placeholder="Promote my coffee shop in Bangalore. Cozy vibe, cold brew specialist, local artist nights, Instagram-heavy audience."
                            />

                            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                                <button className="px-4 py-2 rounded-lg bg-gray-300 text-black text-xs sm:text-sm font-medium">
                                    Create Photos
                                </button>

                                <button className="px-4 py-2 bg-gray-300 rounded-lg border border-black text-xs sm:text-sm font-medium">
                                    Create Reels
                                </button>
                            </div>

                            <p className="text-xs sm:text-sm px-20 text-gray-500">
                                No credit card required • 2-min setup <br />
                                100+ founders already automating
                            </p>

                            {/* Power CTA Button */}
                            <button className="w-full mt-6 sm:mt-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-gray-300 to-gray-500 text-white text-base sm:text-lg font-semibold">
                                Generate 365 Days of Content
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-14 sm:py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {/* Floating Badge */}
                    <div className="flex justify-center mb-5 sm:mb-6"></div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl md:text-5xl text-center text-black mb-3 sm:mb-4">
                        Preview AI-Generated Posts Tailored for Your Business
                    </h2>

                    {/* Subtitle */}
                    <p className="text-center text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-10 sm:mb-16 px-2">
                        Industry-specific templates that update instantly based
                        on your selection
                    </p>

                    {/* Main Card */}
                    <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border border-gray-200 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                        {/* Top Controls */}
                        <div className="flex flex-col gap-6 mb-8 sm:mb-10 relative z-10">
                            {/* Tabs */}
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {[
                                    "Images",
                                    "Reels",
                                    "Festivals & Occasions",
                                ].map((tab, i) => (
                                    <button
                                        key={i}
                                        className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition
                    ${
                        i === 0
                            ? "bg-black text-white shadow-lg"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                    }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Templates Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {filteredImages.length === 0 ? (
                                <p className="col-span-full text-center text-gray-500">
                                    No images found
                                </p>
                            ) : (
                                filteredImages.map((img, index) => (
                                    <div
                                        key={img.id || index}
                                        className="relative w-full h-48 rounded-xl overflow-hidden"
                                    >
                                        <img
                                            src={
                                                img.file
                                                    ? img.file.startsWith(
                                                          "http",
                                                      )
                                                        ? img.file
                                                        : `https://ai-shoutly-backend.onrender.com${img.file}`
                                                    : img.url
                                            }
                                            alt={img.name || "Template"}
                                            className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                                        />
                                        <span className="absolute bottom-2 left-2 text-white bg-black/50 px-2 py-1 text-xs rounded">
                                            {img.name}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/*<AIPapersSection />*/}
            {/* See It In Action Section */}
            <section className="py-14 sm:py-20 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                        {[
                            { emoji: "⚡", title: "2-Minutes Setup" },
                            { emoji: "🎨", title: "Auto-Branded" },
                            { emoji: "📅", title: "365 Days Filled" },
                            { emoji: "🌍", title: "Multi-Platform" },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="bg-gray-100 border border-gray-200 rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
                                    {item.emoji}
                                </div>

                                <h3 className="text-base sm:text-lg font-semibold text-black">
                                    {item.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    {/* Gradient Badge with Floating Particle Motion */}
                    <div className="flex justify-center mb-6">
                        <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold shadow-lg">
                            <div>
                                <SparklesIcon className="w-4 h-4 text-white" />
                            </div>
                            Built for Every Industry
                        </span>
                    </div>

                    {/* Title + Subtitle */}
                    <h2 className="text-4xl md:text-5xl text-black mb-4">
                        Who We Help
                    </h2>

                    <p className="text-gray-600 max-w-2xl mx-auto mb-16">
                        Industry-specific content automation for businesses of
                        all sizes
                    </p>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {/*[
                            { title: "Health & Fitness", emoji: "💪" },
                            { title: "Food & Beverage", emoji: "🍔" },
                            { title: "Fashion & Lifestyle", emoji: "👗" },
                            { title: "Real Estate & Construction", emoji: "🏗️" },
                            { title: "Education & Coaching", emoji: "🎓" },
                            { title: "Finance & Business Services", emoji: "💼" },
                            { title: "Medical & Healthcare", emoji: "🩺" },
                            { title: "Technology & IT Services", emoji: "💻" },
                            { title: "Hospitality & Tourism", emoji: "🏨" },
                            { title: "Automobile Industry", emoji: "🚗" },
                            { title: "Beauty, Salon & Wellness", emoji: "💅" },
                            { title: "Retail & E-Commerce", emoji: "🛒" },
                        ].map((item, index) => (
                            <div key={item.title || index*/}

                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                💪
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Health & Fitness
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Gym / Fitness Studio</li>
                                <li>• Yoga Centre</li>
                                <li>• Zumba / Aerobic Studio</li>
                                <li>• CrossFit / Personal Trainer</li>
                                <div
                                    style={{ display: "none" }}
                                    id="Health"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>• Physiotherapy Clinic</li>
                                    <li>• Dietician / Nutritionist</li>
                                    <li>• Wellness & Supplements</li>
                                    <li>• Weight Loss / Body Transformation</li>
                                </div>
                            </ul>
                            <script src="script.js"></script>

                            {/* More Link */}
                            <a
                                id="more1"
                                onClick={() => more("Health", "more1", "less1")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less1"
                                style={{ display: "none" }}
                                onClick={() => less("Health", "more1", "less1")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                🍔
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Food & Beverage
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Restaurants (veg / multicuisine)</li>
                                <li>• Restaurants (non-veg / multicuisine)</li>
                                <li>• Cafes & Coffee Shops</li>
                                <li>• Juice Bars / Smoothie Bars</li>
                                <div
                                    style={{ display: "none" }}
                                    id="food"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>• Bakery / Cake Shop</li>
                                    <li>• Cloud Kitchen</li>
                                    <li>• Catering Services</li>
                                    <li>• Food Trucks</li>
                                    <li>• Sweets & Namkeen Stores</li>
                                    <li>• Organic & Healthy Food Brands</li>
                                </div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more2"
                                onClick={() => more("food", "more2", "less2")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less2"
                                style={{ display: "none" }}
                                onClick={() => less("food", "more2", "less2")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        {/* 3rd item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                👗
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Fashion & Lifestyle
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Clothing Store / Boutique</li>
                                <li>• Fashion Designer</li>
                                <li>• Footwear</li>
                                <li>• Watches / Jewelry</li>
                                <div
                                    style={{ display: "none" }}
                                    id="fashion"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>• Perfume / Fragrance Brand</li>
                                </div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more3"
                                onClick={() =>
                                    more("fashion", "more3", "less3")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less3"
                                style={{ display: "none" }}
                                onClick={() =>
                                    less("fashion", "more3", "less3")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        {/* 4th item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                🏗️
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Real Estate & Construction
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Real Estate Agents</li>
                                <li>• Developers / Builders</li>
                                <li>• Farm Plots / Gated Communities</li>
                                <li>• Interior Design</li>
                                <div
                                    style={{ display: "none" }}
                                    id="real"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>• Architecture Firms</li>
                                    <li>• Property Consultants</li>
                                    <li>• Home Construction Materials</li>
                                </div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more4"
                                onClick={() => more("real", "more4", "less4")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less4"
                                style={{ display: "none" }}
                                onClick={() => less("real", "more4", "less4")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        {/* 5th item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                🎓
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Education & Coaching
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Schools & Colleges</li>
                                <li>
                                    • Coaching Institutes (NEET / JEE / UPSC /
                                    CAT etc.)
                                </li>
                                <li>• Coding Academy / EdTech</li>
                                <li>• Online Tutors</li>
                                <li>• Pre-School / Montessori</li>
                                <div
                                    style={{ display: "none" }}
                                    id="edu"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>• Skill Training Centres</li>
                                    <li>• IELTS / Language Centres</li>
                                </div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more5"
                                onClick={() => more("edu", "more5", "less5")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less5"
                                style={{ display: "none" }}
                                onClick={() => less("edu", "more5", "less5")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        {/* 6th item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                💼
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Finance & Business Services
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• CA / Tax / GST Services</li>
                                <li>• Insurance Agents</li>
                                <li>• Mutual Fund Advisors</li>
                                <li>• Stock & Crypto Trading Services</li>
                                <div
                                    style={{ display: "none" }}
                                    id="finance"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>• Business Consultants</li>
                                    <li>• Accounting Firms</li>
                                    <li>• Loan Agents</li>
                                </div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more6"
                                onClick={() =>
                                    more("finance", "more6", "less6")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less6"
                                style={{ display: "none" }}
                                onClick={() =>
                                    less("finance", "more6", "less6")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        {/* 7th item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                🩺
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Medical & Healthcare
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Hospitals & Clinics</li>
                                <li>• Dentists</li>
                                <li>• Dermatologists</li>
                                <li>• Eye Clinics</li>
                                <div
                                    style={{ display: "none" }}
                                    id="medical"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>• Pharmacy / Medical Stores</li>
                                    <li>• Diagnostic Laboratories</li>
                                    <li>• Home Nursing Services</li>
                                </div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more7"
                                onClick={() =>
                                    more("medical", "more7", "less7")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less7"
                                style={{ display: "none" }}
                                onClick={() =>
                                    less("medical", "more7", "less7")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        {/* 8th item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                💻
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Technology & IT Services
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• SaaS Products</li>
                                <li>• Website Development</li>
                                <li>• App Development</li>
                                <li>• Digital Marketing Agencies</li>
                                <div
                                    style={{ display: "none" }}
                                    id="tech"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>• AI Tools</li>
                                    <li>• Cyber Security</li>
                                    <li>• Tech Startups</li>
                                </div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more8"
                                onClick={() => more("tech", "more8", "less8")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less8"
                                style={{ display: "none" }}
                                onClick={() => less("tech", "more8", "less8")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        {/* 9th item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                🏨
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Hospitality & Tourism
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Hotels / Resorts</li>
                                <li>• Travel Agencies</li>
                                <li>• Tour Packages</li>
                                <li>• Homestays / Airbnb Hosts</li>
                                <div
                                    style={{ display: "none" }}
                                    id="hospitality"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>• Car Rentals</li>
                                    <li>• Adventure Tourism</li>
                                </div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more9"
                                onClick={() =>
                                    more("hospitality", "more9", "less9")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less9"
                                style={{ display: "none" }}
                                onClick={() =>
                                    less("hospitality", "more9", "less9")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        {/* 10th item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                🚗
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Automobile Industry
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Car Showrooms</li>
                                <li>• Two-Wheeler Dealers</li>
                                <li>• Auto Repair Workshops</li>
                                <li>• Car Spa / Detailing</li>
                                <div
                                    style={{ display: "none" }}
                                    id="auto"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>• Car Accessories & Parts</li>
                                </div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more10"
                                onClick={() => more("auto", "more10", "less10")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less10"
                                style={{ display: "none" }}
                                onClick={() => less("auto", "more10", "less10")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        {/* 11th item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                💅
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Home & Lifestyle
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Furniture Store</li>
                                <li>• Home Decor Brand</li>
                                <li>• Kitchenware</li>
                                <li>• Electronics & Appliances</li>
                                <div
                                    style={{ display: "none" }}
                                    id="home"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>• Cleaning / Pest Control</li>
                                </div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more11"
                                onClick={() => more("home", "more11", "less11")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less11"
                                style={{ display: "none" }}
                                onClick={() => less("home", "more11", "less11")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        {/* 12th item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                🎉
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Events & Entertainment
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Event Planners</li>
                                <li>• Wedding Photographers</li>
                                <li>• Videography / Drone Shoots</li>
                                <li>• DJs / Bands</li>
                                <div
                                    style={{ display: "none" }}
                                    id="events"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>• Stage Decor & Lighting</li>
                                    <li>• Corporate Event Organizers</li>
                                </div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more12"
                                onClick={() =>
                                    more("events", "more12", "less12")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less12"
                                style={{ display: "none" }}
                                onClick={() =>
                                    less("events", "more12", "less12")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>

                        {/* 13th item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                🏔️
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Sports & Outdoor
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Sports Academies</li>
                                <li>• Cricket Training</li>
                                <li>• Football Clubs</li>
                                <li>• Swimming Schools</li>
                                <div
                                    style={{ display: "none" }}
                                    id="sports"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>• Trekking & Adventure Gear</li>
                                </div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more13"
                                onClick={() =>
                                    more("sports", "more13", "less13")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less13"
                                style={{ display: "none" }}
                                onClick={() =>
                                    less("sports", "more13", "less13")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        {/* 14th item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                🛍️
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Retail & E-commerce
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Accessories (Bags)</li>
                                <li>• Footwear</li>
                                <li>• Gift Shops</li>
                                <li>• Home Appliances</li>
                                <div
                                    style={{ display: "none" }}
                                    id="retail"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>• Kids Clothing</li>
                                    <li>• Laptops & Computers</li>
                                    <li>• Men's Clothing</li>
                                    <li>• Online Stores</li>
                                    <li>• Smartphones</li>
                                    <li>• Supermarkets</li>
                                    <li>• Toy Stores</li>
                                    <li>• Wearables</li>
                                    <li>• Women's Clothing</li>
                                </div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more14"
                                onClick={() =>
                                    more("retail", "more14", "less14")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less14"
                                style={{ display: "none" }}
                                onClick={() =>
                                    less("retail", "more14", "less14")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        {/* 15th item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                👤
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Personal Branding
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Coaches / Trainers</li>
                                <li>• Influencers</li>
                                <li>• Motivational Speakers</li>
                                <li>• Consultants</li>
                                <div
                                    style={{ display: "none" }}
                                    id="personal"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>• Podcasters / Content Creators</li>
                                </div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more15"
                                onClick={() =>
                                    more("personal", "more15", "less15")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less15"
                                style={{ display: "none" }}
                                onClick={() =>
                                    less("personal", "more15", "less15")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        {/* 16th item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                🏠
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Home Services
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Electrician / Plumber</li>
                                <li>• Cleaning Services</li>
                                <li>• Solar Panels</li>
                                <li>• Water Purifier Dealers</li>
                                <div
                                    style={{ display: "none" }}
                                    id="ser"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>
                                        • Interior Woodwork / Modular Kitchen
                                    </li>
                                </div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more16"
                                onClick={() => more("ser", "more16", "less16")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less16"
                                style={{ display: "none" }}
                                onClick={() => less("ser", "more16", "less16")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        {/* 17th item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                🤝
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                NGOs & Foundations
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Charitable Trusts</li>
                                <li>• Women & Child Welfare</li>
                                <li>• Environmental Campaigns</li>
                                <li>• Social Causes</li>
                                <div
                                    style={{ display: "none" }}
                                    id="ngo"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                ></div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more17"
                                style={{ display: "none" }}
                                onClick={() => more("ngo", "more17", "less17")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less17"
                                style={{ display: "none" }}
                                onClick={() => less("ngo", "more17", "less17")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        {/* 18th item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                🏭
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Manufacturing & Industrial
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Machinery Industries</li>
                                <li>• Textile Production</li>
                                <li>• Packaging & Printing</li>
                                <li>• Wholesale Distribution</li>
                                <div
                                    style={{ display: "none" }}
                                    id="manu"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                ></div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more18"
                                style={{ display: "none" }}
                                onClick={() => more("manu", "more18", "less18")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less18"
                                style={{ display: "none" }}
                                onClick={() => less("manu", "more18", "less18")}
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        {/* 19th item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}✨
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Beauty, Salon and Wellness
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Ayurvedic & Holis</li>
                                <li>• Beauty Courses</li>
                                <li>• Grooming Services</li>
                                <li>• Hair Care Men</li>
                                <div
                                    style={{ display: "none" }}
                                    id="beauty"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>• Hair Care Women</li>
                                    <li>• Makeup Services</li>
                                    <li>• Nail Care & Art</li>
                                    <li>• Skin Care Services</li>
                                    <li>• Spa & Welness</li>
                                </div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more19"
                                onClick={() =>
                                    more("beauty", "more19", "less19")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less19"
                                style={{ display: "none" }}
                                onClick={() =>
                                    less("beauty", "more19", "less19")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>
                        {/* 20th item */}
                        <div className="rounded-3xl p-6 bg-white border border-gray-200 text-left cursor-pointer relative overflow-hidden">
                            {/* Emoji with micro-pulse */}
                            <div className="text-4xl mb-4">
                                {/*item.emoji*/}
                                🚀
                            </div>

                            {/* Title */}
                            <h3 className="text-black mb-4">
                                {/*item.title*/}
                                Entrepreneurs & Startup Founders
                            </h3>

                            {/* List */}
                            <ul className="text-sm text-gray-600 space-y-2 mb-4">
                                <li>• Startup Founders</li>
                                <li>• Business Owners</li>
                                <li>• Solopreneurs</li>
                                <li>• Digital Entrepreneurs</li>
                                <div
                                    style={{ display: "none" }}
                                    id="entre"
                                    className="text-sm text-gray-600 space-y-2 mb-4"
                                >
                                    <li>• Women Entrepreneurs</li>
                                    <li>• Young Entrepreneurs</li>
                                </div>
                            </ul>

                            {/* More Link */}
                            <a
                                id="more20"
                                onClick={() =>
                                    more("entre", "more20", "less20")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show more
                            </a>
                            <a
                                id="less20"
                                style={{ display: "none" }}
                                onClick={() =>
                                    less("entre", "more20", "less20")
                                }
                                className="text-sm font-medium text-blue-500 hover:text-black-600"
                            >
                                show less
                            </a>
                        </div>

                        {/*))*/}
                    </div>

                    {/* Bottom CTA Button */}
                    <div className="flex justify-center">
                        <button className="px-10 h-14 rounded-full bg-black text-white text-sm font-semibold">
                            Find Your Industry
                        </button>
                    </div>
                </div>
            </section>
            <section className="py-14 sm:py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {/* Floating Badge */}
                    <div className="flex justify-center mb-5 sm:mb-6">
                        <span className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs sm:text-sm font-semibold shadow-lg">
                            <SparklesIcon className="w-4 h-4 text-white" />
                            10,000+ Professional Templates
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl md:text-5xl text-center text-black mb-3 sm:mb-4">
                        Browse Our Library
                    </h2>

                    {/* Subtitle */}
                    <p className="text-center text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-10 sm:mb-16 px-2">
                        Industry-specific templates that update instantly based
                        on your selection
                    </p>

                    {/* Main Card */}
                    <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border border-gray-200 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                        {/* Top Controls */}
                        <div className="flex flex-col gap-6 mb-8 sm:mb-10 relative z-10">
                            {/* Tabs */}
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {[
                                    "Images",
                                    "Reels",
                                    "Festivals & Occasions",
                                ].map((tab, i) => (
                                    <button
                                        key={i}
                                        className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition
                    ${
                        i === 0
                            ? "bg-black text-white shadow-lg"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                    }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Search + Dropdown */}
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <input
                                    type="text"
                                    placeholder="Search templates"
                                    className="w-full px-4 py-2 rounded-xl bg-white text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />

                                <select
                                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white text-gray-800 border border-gray-300 focus:outline-none text-sm"
                                    value={selectedIndustry}
                                    onChange={(e) =>
                                        setSelectedIndustry(e.target.value)
                                    }
                                >
                                    <option value="">All Industries</option>
                                    {industries.map((industry: any) => (
                                        <option
                                            key={industry.id}
                                            value={industry.id}
                                        >
                                            {industry.name}
                                        </option>
                                    ))}
                                </select>

                                {/* Refresh Button */}
                                <button
                                    onClick={refreshImages}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-300 text-gray-700 text-sm hover:bg-gray-100 hover:shadow-sm transition-all"
                                >
                                    <RefreshCcw
                                        className={`w-4 h-4 text-gray-500 ${loadingImages ? "animate-spin" : ""}`}
                                    />
                                    Refresh
                                </button>
                            </div>
                        </div>

                        {/* Templates Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-4">
                            {filteredImages.length === 0 ? (
                                <p className="col-span-full text-center text-gray-500">
                                    No images found
                                </p>
                            ) : (
                                filteredImages.map((img, index) => (
                                    <div
                                        key={img.id || index}
                                        className="relative w-full h-48 rounded-xl overflow-hidden"
                                    >
                                        <img
                                            src={
                                                img.file
                                                    ? img.file.startsWith(
                                                          "http",
                                                      )
                                                        ? img.file
                                                        : `https://ai-shoutly-backend.onrender.com${img.file}`
                                                    : img.url
                                            }
                                            alt={img.name || "Template"}
                                            className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                                        />
                                        <span className="absolute bottom-2 left-2 text-white bg-black/50 px-2 py-1 text-xs rounded">
                                            {img.name}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <div id="pricing">
                {/* Assuming PricingSection is robust, otherwise wrap it */}
                <PricingSection />
            </div>
            
            <section className="py-14 sm:py-20 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    {/* Title */}
                    <div className="text-2xl sm:text-3xl md:text-5xl text-black font-arial mb-10 sm:mb-12">
                        See it in Action
                    </div>

                    {/* Flow Steps */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-12 sm:mb-16">
                        {[
                            { label: "Select Industry", color: "bg-blue-500" },
                            { label: "Enter Prompt", color: "bg-violet-500" },
                            { label: "AI Generates", color: "bg-pink-500" },
                            { label: "Auto Schedule", color: "bg-green-500" },
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3"
                            >
                                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 text-xs sm:text-sm font-medium text-black bg-gray-100 shadow-sm backdrop-blur-md">
                                    {/* Animated Dot */}
                                    <div
                                        className={`w-2.5 h-2.5 rounded-full ${step.color}`}
                                    />

                                    {step.label}
                                </div>

                                {/* Animated Arrow */}
                                {index !== 3 && (
                                    <div className="hidden sm:inline text-gray-400 text-xl">
                                        →
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Video Section */}
                    <div className="relative max-w-4xl mx-auto mb-14 sm:mb-20">
                        <div className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-black group">
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover cursor-pointer"
                                src="videos/video.mp4"
                                onClick={toggleVideo}
                            />

                            {!isPlaying && (
                                <button
                                    onClick={toggleVideo}
                                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                                >
                                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white text-black flex items-center justify-center text-xl sm:text-2xl shadow-xl">
                                        ▶
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
                    {/* Feature Cards */}
                </div>
            </section>
        </div>
    );
}
