import React, { useState } from 'react';
import Layout from './Layout';
import axios from 'axios';

function SettingsPage() {
    const [enablePublishing, setEnablePublishing] = useState(false);
    const [institutionName, setInstitutionName] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const [isSearchable, setIsSearchable] = useState(false); 
    const [extraSearchTerms, setExtraSearchTerms] = useState('');
    const [requirePassword, setRequirePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [timezone, setTimezone] = useState('');

    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/publishing-settings', {
                institutionName,
                departmentName,
                isSearchable,
                extraSearchTerms,
                requirePassword,
                password,
                timezone,
            });
            alert(response.data.message); 
        } catch (error) {
            console.error('Error saving publishing settings:', error);
            alert('Error saving settings. Please try again.'); 
        }
    };

    return (
        <Layout>
    <div className="w-full max-w-5xl mx-auto">
        <div className="bg-[#F3F3F3] flex flex-col gap-4 p-6">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <div className="mb-8">
                        <label className="block text-lg mb-2">Set the first day of the year to:</label>
                        <div className="flex gap-4">
                            <select className="border-2 border-gray-300 rounded-md p-2 w-full">
                                {/* Month options */}
                            </select>
                            <select className="border-2 border-gray-300 rounded-md p-2 w-full">
                                {/* Day options */}
                            </select>
                        </div>
                    </div>
                    <h2 className="font-bold text-xl mb-4">Publishing</h2>
                    <label className="flex items-center gap-2 mb-4">
                        <input
                            type="checkbox"
                            className="w-4 h-4"
                            checked={enablePublishing}
                            onChange={() => setEnablePublishing(!enablePublishing)}
                        />
                        Enable Publishing
                    </label>
                    <div className={`border-2 border-gray-300 rounded-md p-4 ${enablePublishing ? 'bg-white' : 'bg-gray-200'}`}>
                        <div className="mb-4">
                            <label className="block text-sm mb-2">Your Institution’s name:</label>
                            <input
                                type="text"
                                placeholder="Institution Name"
                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                value={institutionName}
                                onChange={(e) => setInstitutionName(e.target.value)}
                                disabled={!enablePublishing}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm mb-2">Your department:</label>
                            <input
                                type="text"
                                placeholder="Department"
                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                value={departmentName}
                                onChange={(e) => setDepartmentName(e.target.value)}
                                disabled={!enablePublishing}
                            />
                        </div>
                        <label className="flex items-center gap-2 mb-4">
                            <input
                                type="checkbox"
                                className="w-4 h-4"
                                checked={isSearchable}
                                onChange={() => setIsSearchable(!isSearchable)}
                                disabled={!enablePublishing}
                            />
                            Make this account searchable on MedRez.net home page.
                        </label>
                        <label className="block text-sm mb-2">Extra search terms:</label>
                        <input
                            type="text"
                            placeholder="Extra search terms"
                            className="border-2 border-gray-300 rounded-md p-2 w-full"
                            value={extraSearchTerms}
                            onChange={(e) => setExtraSearchTerms(e.target.value)}
                            disabled={!enablePublishing}
                        />
                        <label className="flex items-center gap-2 mb-4">
                            <input
                                type="checkbox"
                                className="w-4 h-4"
                                checked={requirePassword}
                                onChange={() => setRequirePassword(!requirePassword)}
                                disabled={!enablePublishing}
                            />
                            Require password to view the schedules.
                        </label>
                        <label className="block text-sm mb-2">Password:</label>
                        <input
                            type="password"
                            placeholder="Password (letters and numbers only)"
                            className="border-2 border-gray-300 rounded-md p-2 w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={!enablePublishing || !requirePassword}
                        />
                        <label className="block text-sm mb-2">Timezone for exported ICS calendar files:</label>
                        <select
                            className="border-2 border-gray-300 rounded-md p-2 w-full"
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                            disabled={!enablePublishing}
                        >
                            {/* Timezone options */}
                        </select>
                        <button onClick={handleSave} className="bg-green-500 text-white px-6 py-2 rounded-md mt-4 w-full">
                            Save
                        </button>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-yellow-100 p-4 rounded-md">
                        <h3 className="font-bold">Academic Year Help</h3>
                        <p className="text-gray-600">
                            To understand the implications of this setting, please read the{' '}
                            <a href="#" className="text-blue-600 underline">Schedule Maker's Guide</a>.
                        </p>
                    </div>
                    <div className="border-2 border-blue-500 p-4 rounded-md">
                        <h3 className="font-bold">Publishing Help:</h3>
                        <p className="text-gray-600">
                            Publishing your schedules lets your residents and staff see when they work online.
                        </p>
                        <p className="text-gray-600">
                            We highly recommend that you use a password to prevent undesired access to the schedules.
                        </p>
                        <p className="text-gray-600">
                            Get more help on publishing in the{' '}
                            <a href="#" className="text-blue-600 underline">Schedule Maker's Guide</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Layout>

    );
}

export default SettingsPage;
