import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../lib/supabase';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#db2777',
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f472b6',
    marginBottom: 10,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f472b6',
    backgroundColor: '#fce7f3',
    padding: 8,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f472b6',
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#db2777',
  },
  tableCell: {
    fontSize: 10,
    color: '#374151',
  },
  summary: {
    fontSize: 12,
    marginTop: 20,
    color: '#374151',
  },
});

// Students PDF Document
const StudentsPDF = ({ students, title }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>{title}</Text>
      
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Student Number</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Name</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Course</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Year Level</Text>
          </View>
        </View>
        
        {students.map((student, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{student.student_number}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{student.first_name} {student.last_name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{student.course}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Year {student.year_level}</Text>
            </View>
          </View>
        ))}
      </View>
      
      <Text style={styles.summary}>
        Total Students: {students.length}
      </Text>
    </Page>
  </Document>
);

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*');

      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async () => {
    try {
      const blob = await pdf(<StudentsPDF students={filteredStudents} title="Students Report" />).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleCreate = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const { error } = await supabase
          .from('students')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Error deleting student');
      }
    }
  };

  const handleSubmit = async (studentData) => {
    try {
      if (editingStudent) {
        const { error } = await supabase
          .from('students')
          .update(studentData)
          .eq('id', editingStudent.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('students')
          .insert([studentData]);

        if (error) throw error;
      }
      setShowForm(false);
      setEditingStudent(null);
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
      alert('Error saving student');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  const filteredStudents = students.filter(student =>
    student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.student_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-fuchsia-200 flex items-center justify-center">
        <div className="text-lg font-bold text-pink-600 animate-pulse">Loading... ✨</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-fuchsia-200 relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-fuchsia-300 rounded-full opacity-30 animate-pulse delay-75"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-pink-400 rounded-full opacity-15 animate-pulse delay-150"></div>

      {/* Navigation */}
      <nav className="bg-gradient-to-r from-pink-500 via-pink-600 to-fuchsia-500 shadow-xl border-b-4 border-pink-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-white drop-shadow-lg flex items-center gap-2">
              💖 Grade Management System
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-white hover:text-pink-100 font-medium transition-colors duration-200 hover:scale-105 transform">
                Home
              </Link>
              <Link to="/students" className="text-white font-bold underline underline-offset-4 decoration-2">
                Students
              </Link>
              <Link to="/subjects" className="text-white hover:text-pink-100 font-medium transition-colors duration-200 hover:scale-105 transform">
                Subjects
              </Link>
              <Link to="/grades" className="text-white hover:text-pink-100 font-medium transition-colors duration-200 hover:scale-105 transform">
                Grades
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-fuchsia-600 text-transparent bg-clip-text flex items-center gap-2">
            ✨ Students Management
          </h1>
          <div className="flex gap-3">
            <button
              onClick={generatePDF}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              📊 Generate PDF
            </button>
            <button
              onClick={handleCreate}
              className="bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white px-6 py-3 rounded-full hover:from-pink-600 hover:to-fuchsia-600 transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              + Add New Student
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search students by name, student number, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 border-3 border-pink-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-500 shadow-md bg-white/90 backdrop-blur-sm text-gray-800 font-medium placeholder-pink-400"
          />
        </div>

        {/* PDF Download Link */}
        {pdfUrl && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-green-700 font-bold">📊 PDF Ready!</span>
              <div className="flex gap-2">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  👁️ View PDF
                </a>
                <a
                  href={pdfUrl}
                  download="students_report.pdf"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  📥 Download PDF
                </a>
                <button
                  onClick={() => window.print()}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  🖨️ Print
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Students Table */}
        <div className="bg-gradient-to-br from-white to-pink-50 shadow-2xl rounded-3xl overflow-hidden border-4 border-pink-300">
          <table className="min-w-full divide-y divide-pink-200">
            <thead className="bg-gradient-to-r from-pink-400 to-fuchsia-400">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Student Number
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Year Level
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/80 backdrop-blur-sm divide-y divide-pink-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-pink-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-pink-700">
                    {student.student_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                    {student.first_name} {student.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {student.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <span className="bg-gradient-to-r from-pink-100 to-fuchsia-100 px-3 py-1 rounded-full font-semibold text-pink-700">
                      Year {student.year_level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold space-x-3">
                    <button
                      onClick={() => handleEdit(student)}
                      className="text-fuchsia-600 hover:text-fuchsia-800 hover:underline transition-all duration-200"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="text-red-500 hover:text-red-700 hover:underline transition-all duration-200"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12 text-pink-600 font-medium">
              <div className="text-4xl mb-3">📚</div>
              No students found. {searchTerm && 'Try adjusting your search terms.'}
            </div>
          )}
        </div>

        {showForm && (
          <StudentForm
            student={editingStudent}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

// StudentForm Component (unchanged)
const StudentForm = ({ student, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    student_number: student?.student_number || '',
    first_name: student?.first_name || '',
    last_name: student?.last_name || '',
    course: student?.course || '',
    year_level: student?.year_level || 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-white via-pink-50 to-fuchsia-50 rounded-3xl p-8 w-full max-w-md shadow-2xl border-4 border-pink-400 relative transform animate-scale-in">
        <div className="absolute -top-4 -right-4 text-4xl">✨</div>
        <div className="absolute -bottom-4 -left-4 text-4xl">💕</div>
        
        <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-pink-600 to-fuchsia-600 text-transparent bg-clip-text flex items-center gap-2">
          {student ? '✏️ Edit Student' : '➕ Add New Student'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-pink-700 mb-2">Student Number</label>
            <input
              type="text"
              name="student_number"
              value={formData.student_number}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-2 border-pink-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-3 focus:ring-pink-400 focus:border-pink-500 bg-white shadow-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-pink-700 mb-2">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-2 border-pink-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-3 focus:ring-pink-400 focus:border-pink-500 bg-white shadow-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-pink-700 mb-2">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-2 border-pink-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-3 focus:ring-pink-400 focus:border-pink-500 bg-white shadow-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-pink-700 mb-2">Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-2 border-pink-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-3 focus:ring-pink-400 focus:border-pink-500 bg-white shadow-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-pink-700 mb-2">Year Level</label>
            <select
              name="year_level"
              value={formData.year_level}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-2 border-pink-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-3 focus:ring-pink-400 focus:border-pink-500 bg-white shadow-sm font-medium"
            >
              <option value={1}>Year 1</option>
              <option value={2}>Year 2</option>
              <option value={3}>Year 3</option>
              <option value={4}>Year 4</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-sm font-bold text-gray-700 hover:text-gray-900 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-full hover:from-pink-600 hover:to-fuchsia-600 shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200"
            >
              {student ? '💾 Update' : '✨ Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentsPage;