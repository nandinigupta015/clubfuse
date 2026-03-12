import React from "react";
import { motion } from "framer-motion";

export default function ClubSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-2" />
                    <div className="h-3 bg-gray-100 rounded-full w-1/4" />
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-100 rounded-full w-full" />
                <div className="h-3 bg-gray-100 rounded-full w-5/6" />
            </div>

            <div className="flex justify-between mb-4">
                <div className="h-3 bg-gray-100 rounded-full w-1/4" />
                <div className="h-3 bg-gray-100 rounded-full w-1/4" />
            </div>

            <div className="h-10 bg-gray-100 rounded-xl w-full" />

            <div className="mt-4 h-10 bg-gray-200 rounded-xl w-full" />
        </div>
    );
}
