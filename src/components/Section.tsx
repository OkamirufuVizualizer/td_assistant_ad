import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Modal } from './Modal';
import { SchoolForm } from './forms/SchoolForm/index';
import { InspirationForm } from './forms/InspirationForm';
import { TechniquesForm } from './forms/TechniquesForm';

interface SectionProps {
  title: string;
  type: 'school' | 'inspiration' | 'techniques';
}

export const Section: React.FC<SectionProps> = ({ title, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderForm = () => {
    switch (type) {
      case 'school':
        return <SchoolForm onClose={() => setIsModalOpen(false)} />;
      case 'inspiration':
        return <InspirationForm onClose={() => setIsModalOpen(false)} />;
      case 'techniques':
        return <TechniquesForm onClose={() => setIsModalOpen(false)} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold dark:text-white">{title}</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Content
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Add ${title} Content`}
      >
        {renderForm()}
      </Modal>
    </div>
  );
};