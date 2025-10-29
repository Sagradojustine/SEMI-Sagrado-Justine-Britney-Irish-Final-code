import React from 'react';

const StudentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
        <h3 className="text-lg font-semibold">{student.first_name} {student.last_name}</h3>
        <p className="text-sm opacity-90">{student.student_number}</p>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Course</span>
          <span className="font-medium">{student.course}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Year Level</span>
          <span className="font-medium">Year {student.year_level}</span>
        </div>
        
        <div className="pt-4 flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(student)}
            className="px-3 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(student.id)}
            className="px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;