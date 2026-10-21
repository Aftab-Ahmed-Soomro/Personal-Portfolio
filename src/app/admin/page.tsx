"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase, Project } from "@/lib/supabase";
import {
  Upload,
  Trash2,
  ExternalLink,
  PlusCircle,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Lock,
  LogOut,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function AdminPage() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Projects State
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [badge, setBadge] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Check login session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: authPassword,
      });

      if (error) throw error;
      setIsAuthenticated(true);
    } catch (err: unknown) {
      const error = err as Error;
      setAuthError(error.message || "Invalid login credentials.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  // Fetch projects from Supabase
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Fetch error:", error);
      setStatusMsg({
        type: "error",
        text: "Failed to load projects: " + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  // Handle image selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle project submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setStatusMsg({
        type: "error",
        text: "Title and Description are required!",
      });
      return;
    }
    if (!imageFile) {
      setStatusMsg({
        type: "error",
        text: "Please select a project image!",
      });
      return;
    }

    try {
      setSubmitting(true);
      setStatusMsg(null);

      // 1. Upload image to Supabase Storage
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // 2. Get public URL of uploaded image
      const { data: urlData } = supabase.storage
        .from("project-images")
        .getPublicUrl(filePath);

      const imageUrl = urlData.publicUrl;

      // 3. Insert record into database
      const { error: insertError } = await supabase.from("projects").insert([
        {
          title: title.trim(),
          description: description.trim(),
          image: imageUrl,
          badge: badge.trim() || null,
          live_url: liveUrl.trim() || null,
          github_url: githubUrl.trim() || null,
        },
      ]);

      if (insertError) throw insertError;

      // Reset form
      setTitle("");
      setDescription("");
      setBadge("");
      setLiveUrl("");
      setGithubUrl("");
      setImageFile(null);
      setImagePreview(null);
      setStatusMsg({
        type: "success",
        text: "Project uploaded successfully!",
      });

      fetchProjects();
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Submission error:", error);
      setStatusMsg({
        type: "error",
        text: "Failed to upload project: " + error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle project deletion
  const handleDelete = async (id: string, titleName: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${titleName}"?`
    );
    if (!confirmDelete) return;

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;

      setProjects((prev) => prev.filter((p) => p.id !== id));
      setStatusMsg({
        type: "success",
        text: `"${titleName}" was deleted successfully!`,
      });
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Delete error:", error);
      setStatusMsg({
        type: "error",
        text: "Failed to delete project: " + error.message,
      });
    }
  };

  // 1. Initial Checking State
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">
        <Loader2 className="w-8 h-8 animate-spin text-teal-400" />
      </div>
    );
  }

  // 2. Login Screen (agar logged in nahi hain)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-zinc-900/70 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Admin Access Only
            </h1>
            <p className="text-xs text-zinc-400">
              Only authorized owner can log in to manage projects.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="youremail@example.com"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-zinc-100 text-sm outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-zinc-100 text-sm outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-zinc-950 font-semibold text-sm transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                </>
              ) : (
                "Log In to Admin Panel"
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Admin Dashboard (Logged in user ke liye)
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-teal-400 transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Projects Admin Panel
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Upload new projects and manage existing portfolio entries.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" /> Log Out
          </button>
        </div>

        {/* Status Message Notification */}
        {statusMsg && (
          <div
            className={`p-4 rounded-xl flex items-center gap-3 text-sm border ${
              statusMsg.type === "success"
                ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-300"
                : "bg-red-950/40 border-red-800/60 text-red-300"
            }`}
          >
            {statusMsg.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Upload Form */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-teal-400" /> Upload New Project
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SaaS AI Platform"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-zinc-100 placeholder-zinc-500 outline-none transition"
                />
              </div>

              {/* Badge */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Badge (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Full Stack / AI / Featured"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-zinc-100 placeholder-zinc-500 outline-none transition"
                />
              </div>

              {/* Live URL */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Live URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-zinc-100 placeholder-zinc-500 outline-none transition"
                />
              </div>

              {/* GitHub URL */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  GitHub URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-zinc-100 placeholder-zinc-500 outline-none transition"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Project Description *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Provide details about the project..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-zinc-100 placeholder-zinc-500 outline-none transition resize-y"
              />
            </div>

            {/* Image File Upload */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Project Screenshot / Cover Image *
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-sm font-medium transition border border-zinc-700">
                  <Upload className="w-4 h-4 text-teal-400" />
                  <span>Choose Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-zinc-400">
                  {imageFile ? imageFile.name : "No image selected"}
                </span>
              </div>

              {/* Preview */}
              {imagePreview && (
                <div className="mt-4 relative w-full max-w-sm h-48 rounded-xl overflow-hidden border border-zinc-800">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-zinc-950 font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Uploading to
                    Supabase...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" /> Save & Publish Project
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Existing Projects List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Existing Uploaded Projects ({projects.length})
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-12 text-zinc-400">
              <Loader2 className="w-6 h-6 animate-spin mr-2 text-teal-400" />{" "}
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl text-zinc-500">
              No projects uploaded yet. Use the form above to add your first project!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="relative w-full h-40 rounded-lg overflow-hidden bg-zinc-950">
                      {proj.image ? (
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-zinc-600">
                          No Image
                        </div>
                      )}
                      {proj.badge && (
                        <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-500/20 text-teal-400 border border-teal-500/30">
                          {proj.badge}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {proj.title}
                      </h3>
                      <p className="text-sm text-zinc-400 line-clamp-2 mt-1">
                        {proj.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3">
                    <div className="flex items-center gap-3">
                      {proj.live_url && (
                        <a
                          href={proj.live_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-400 hover:text-teal-400 text-xs inline-flex items-center gap-1 transition"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Live
                        </a>
                      )}
                      {proj.github_url && (
                        <a
                          href={proj.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-400 hover:text-teal-400 text-xs inline-flex items-center gap-1 transition"
                        >
                          <FaGithub className="w-3.5 h-3.5" /> GitHub
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => handleDelete(proj.id!, proj.title)}
                      className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
