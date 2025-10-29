import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../lib/supabase';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#db2777',
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666666',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#db2777',
    backgroundColor: '#fce7f3',
    padding: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statBox: {
    width: '23%',
    padding: 8,
    backgroundColor: '#fce7f3',
    borderRadius: 4,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#db2777',
  },
  statLabel: {
    fontSize: 9,
    color: '#666666',
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
    width: '12.5%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f472b6',
    backgroundColor: '#fce7f3',
    padding: 5,
  },
  tableCol: {
    width: '12.5%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f472b6',
    padding: 4,
  },
  tableCellHeader: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#db2777',
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 7,
    color: '#374151',
    textAlign: 'center',
  },
  analysisItem: {
    fontSize: 10,
    marginBottom: 4,
    color: '#374151',
  },
  passed: {
    color: '#10b981',
    fontWeight: 'bold',
  },
  failed: {
    color: '#ef4444',
    fontWeight: 'bold',
  },
  studentList: {
    fontSize: 9,
    marginBottom: 2,
    color: '#666666',
    marginLeft: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#999999',
  },
});

// Grades PDF Document
const GradesPDF = ({ grades, students, subjects, analysisData, title }) => {
  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? `${student.first_name} ${student.last_name}` : 'Unknown';
  };

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.subject_name : 'Unknown';
  };

  const getSubjectCode = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.subject_code : 'Unknown';
  };

  const calculateFinalGrade = (grade) => {
    const prelim = parseFloat(grade.prelim) || 0;
    const midterm = parseFloat(grade.midterm) || 0;
    const semifinal = parseFloat(grade.semifinal) || 0;
    const final = parseFloat(grade.final) || 0;
    return (prelim * 0.2 + midterm * 0.2 + semifinal * 0.2 + final * 0.4).toFixed(1);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.subheader}>Comprehensive Grades Report</Text>
        
        {/* Summary Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUMMARY STATISTICS</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{analysisData.totalStudents}</Text>
              <Text style={styles.statLabel}>Total Students</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{analysisData.averageGrade}</Text>
              <Text style={styles.statLabel}>Average Grade</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, styles.passed]}>{analysisData.passedStudents}</Text>
              <Text style={styles.statLabel}>Passed</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, styles.failed]}>{analysisData.failedStudents}</Text>
              <Text style={styles.statLabel}>Failed</Text>
            </View>
          </View>
        </View>

        {/* Grades Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DETAILED GRADES BREAKDOWN</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Student</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Subject</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Prelim</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Midterm</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Semi-final</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Final</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Grade</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Status</Text>
              </View>
            </View>
            
            {grades.map((grade, index) => {
              const finalGrade = calculateFinalGrade(grade);
              const isPassed = parseFloat(finalGrade) >= 75;

              return (
                <View style={styles.tableRow} key={index}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{getStudentName(grade.student_id)}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{getSubjectCode(grade.subject_id)}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{grade.prelim || '-'}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{grade.midterm || '-'}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{grade.semifinal || '-'}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{grade.final || '-'}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{finalGrade}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={isPassed ? styles.passed : styles.failed}>
                      {isPassed ? 'PASS' : 'FAIL'}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Performance Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PERFORMANCE ANALYSIS</Text>
          <Text style={styles.analysisItem}>
            • Overall Performance: {analysisData.averageGrade >= 75 ? 'GOOD' : 'NEEDS IMPROVEMENT'} (Average: {analysisData.averageGrade})
          </Text>
          <Text style={styles.analysisItem}>
            • Pass Rate: {analysisData.passRate}% of students met the passing requirement (≥75)
          </Text>
          <Text style={styles.analysisItem}>
            • Students Needing Attention: {analysisData.failedStudents} students below passing grade
          </Text>
        </View>

        {/* Student Lists */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>STUDENT PERFORMANCE BREAKDOWN</Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '48%' }}>
              <Text style={[styles.analysisItem, styles.passed]}>
                PASSED STUDENTS ({analysisData.passedStudents})
              </Text>
              {analysisData.passedStudentsList.slice(0, 10).map((student, index) => (
                <Text key={index} style={styles.studentList}>• {student}</Text>
              ))}
              {analysisData.passedStudentsList.length > 10 && (
                <Text style={styles.studentList}>• ... and {analysisData.passedStudentsList.length - 10} more</Text>
              )}
            </View>

            {analysisData.failedStudents > 0 && (
              <View style={{ width: '48%' }}>
                <Text style={[styles.analysisItem, styles.failed]}>
                  NEEDS ATTENTION ({analysisData.failedStudents})
                </Text>
                {analysisData.failedStudentsList.slice(0, 10).map((student, index) => (
                  <Text key={index} style={styles.studentList}>• {student}</Text>
                ))}
                {analysisData.failedStudentsList.length > 10 && (
                  <Text style={styles.studentList}>• ... and {analysisData.failedStudentsList.length - 10} more</Text>
                )}
              </View>
            )}
          </View>
        </View>

        <Text style={styles.footer}>
          Generated on {new Date().toLocaleDateString()} | Grade Management System
        </Text>
      </Page>
    </Document>
  );
};

// GradeForm Component
const GradeForm = ({ grade, students, subjects, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    student_id: grade?.student_id || '',
    subject_id: grade?.subject_id || '',
    prelim: grade?.prelim || '',
    midterm: grade?.midterm || '',
    semifinal: grade?.semifinal || '',
    final: grade?.final || ''
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
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-pink-50 via-white to-fuchsia-50 rounded-3xl p-8 w-full max-w-2xl shadow-2xl border-4 border-pink-200 transform transition-all duration-300 animate-slideUp">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-pink-600 to-fuchsia-600 text-transparent bg-clip-text flex items-center justify-center gap-2">
            {grade ? '✏️ Edit Grade' : '✨ Add New Grade'}
          </h2>
          <p className="text-pink-500 text-sm mt-2">Fill in the details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-pink-700 mb-2">👤 Student</label>
            <select
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              required
              className="w-full border-3 border-pink-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-500 shadow-md bg-white text-gray-800 font-medium transition-all duration-200 hover:border-pink-400"
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.first_name} {student.last_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-pink-700 mb-2">📚 Subject</label>
            <select
              name="subject_id"
              value={formData.subject_id}
              onChange={handleChange}
              required
              className="w-full border-3 border-pink-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-500 shadow-md bg-white text-gray-800 font-medium transition-all duration-200 hover:border-pink-400"
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.subject_code} - {subject.subject_name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-pink-700 mb-2">📝 Prelim Grade (20%)</label>
              <input
                type="number"
                name="prelim"
                value={formData.prelim}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.1"
                placeholder="0-100"
                className="w-full border-3 border-pink-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-500 shadow-md bg-white text-gray-800 font-medium transition-all duration-200 hover:border-pink-400"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-pink-700 mb-2">📝 Midterm Grade (20%)</label>
              <input
                type="number"
                name="midterm"
                value={formData.midterm}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.1"
                placeholder="0-100"
                className="w-full border-3 border-pink-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-500 shadow-md bg-white text-gray-800 font-medium transition-all duration-200 hover:border-pink-400"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-pink-700 mb-2">📝 Semi-final Grade (20%)</label>
              <input
                type="number"
                name="semifinal"
                value={formData.semifinal}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.1"
                placeholder="0-100"
                className="w-full border-3 border-pink-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-500 shadow-md bg-white text-gray-800 font-medium transition-all duration-200 hover:border-pink-400"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-pink-700 mb-2">📝 Final Grade (40%)</label>
              <input
                type="number"
                name="final"
                value={formData.final}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.1"
                placeholder="0-100"
                className="w-full border-3 border-pink-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-500 shadow-md bg-white text-gray-800 font-medium transition-all duration-200 hover:border-pink-400"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t-2 border-pink-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-sm font-bold text-pink-600 hover:text-pink-700 bg-pink-100 hover:bg-pink-200 rounded-full transition-all duration-200 hover:scale-105 transform shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-full hover:from-pink-600 hover:to-fuchsia-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              {grade ? '💾 Update Grade' : '✨ Create Grade'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

const GradesPage = () => {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [gradesResponse, studentsResponse, subjectsResponse] = await Promise.all([
        supabase.from('grades').select('*'),
        supabase.from('students').select('*'),
        supabase.from('subjects').select('*')
      ]);

      if (gradesResponse.error) throw gradesResponse.error;
      if (studentsResponse.error) throw studentsResponse.error;
      if (subjectsResponse.error) throw subjectsResponse.error;

      setGrades(gradesResponse.data || []);
      setStudents(studentsResponse.data || []);
      setSubjects(subjectsResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingGrade(null);
    setShowForm(true);
  };

  const handleEdit = (grade) => {
    setEditingGrade(grade);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this grade record?')) {
      try {
        const { error } = await supabase
          .from('grades')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchData();
      } catch (error) {
        console.error('Error deleting grade:', error);
        alert('Error deleting grade');
      }
    }
  };

  const handleSubmit = async (gradeData) => {
    try {
      if (editingGrade) {
        const { error } = await supabase
          .from('grades')
          .update(gradeData)
          .eq('id', editingGrade.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('grades')
          .insert([gradeData]);

        if (error) throw error;
      }
      setShowForm(false);
      setEditingGrade(null);
      fetchData();
    } catch (error) {
      console.error('Error saving grade:', error);
      alert('Error saving grade');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingGrade(null);
  };

  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? `${student.first_name} ${student.last_name}` : 'Unknown';
  };

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.subject_name : 'Unknown';
  };

  const getSubjectCode = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.subject_code : 'Unknown';
  };

  const calculateFinalGrade = (grade) => {
    const prelim = parseFloat(grade.prelim) || 0;
    const midterm = parseFloat(grade.midterm) || 0;
    const semifinal = parseFloat(grade.semifinal) || 0;
    const final = parseFloat(grade.final) || 0;
    
    return (prelim * 0.2 + midterm * 0.2 + semifinal * 0.2 + final * 0.4).toFixed(1);
  };

  const getGradeColor = (grade) => {
    const finalGrade = parseFloat(grade);
    if (finalGrade >= 90) return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
    if (finalGrade >= 80) return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white';
    if (finalGrade >= 75) return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white';
    return 'bg-gradient-to-r from-red-500 to-rose-500 text-white';
  };

  const filteredGrades = grades.filter(grade => {
    const studentName = getStudentName(grade.student_id).toLowerCase();
    const subjectName = getSubjectName(grade.subject_id).toLowerCase();
    const subjectCode = getSubjectCode(grade.subject_id).toLowerCase();
    
    return studentName.includes(searchTerm.toLowerCase()) ||
           subjectName.includes(searchTerm.toLowerCase()) ||
           subjectCode.includes(searchTerm.toLowerCase());
  });

  // Calculate analysis data
  const calculateAnalysisData = () => {
    const finalGrades = filteredGrades.map(grade => ({
      ...grade,
      finalGrade: parseFloat(calculateFinalGrade(grade)),
      studentName: getStudentName(grade.student_id)
    }));

    const totalStudents = finalGrades.length;
    const passedStudents = finalGrades.filter(g => g.finalGrade >= 75).length;
    const failedStudents = finalGrades.filter(g => g.finalGrade < 75).length;
    const averageGrade = totalStudents > 0 
      ? (finalGrades.reduce((sum, g) => sum + g.finalGrade, 0) / totalStudents).toFixed(2)
      : '0.00';
    const passRate = totalStudents > 0 ? ((passedStudents / totalStudents) * 100).toFixed(1) : '0.0';

    const passedStudentsList = finalGrades
      .filter(g => g.finalGrade >= 75)
      .map(g => g.studentName);

    const failedStudentsList = finalGrades
      .filter(g => g.finalGrade < 75)
      .map(g => g.studentName);

    return {
      totalStudents,
      passedStudents,
      failedStudents,
      averageGrade,
      passRate,
      passedStudentsList,
      failedStudentsList
    };
  };

  const analysisData = calculateAnalysisData();

  const generatePDF = async () => {
    try {
      const blob = await pdf(
        <GradesPDF 
          grades={filteredGrades} 
          students={students}
          subjects={subjects}
          analysisData={analysisData}
          title="Grades Report" 
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-fuchsia-200 flex items-center justify-center">
        <div className="text-lg font-bold text-pink-600 animate-pulse">Loading... ✨</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-fuchsia-200 relative overflow-hidden">
      {/* Print Styles */}
      <style>{`
        @media print {
          /* Hide everything except the tables and analysis */
          body * {
            visibility: hidden;
          }
          
          /* Show only the printable content */
          .printable-table,
          .printable-table *,
          .printable-analysis,
          .printable-analysis * {
            visibility: visible;
          }
          
          /* Position printable content at top of page */
          .printable-table {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          
          .printable-analysis {
            position: absolute;
            left: 0;
            top: auto;
            width: 100%;
            page-break-before: always;
          }
          
          /* Remove backgrounds and adjust for print */
          body {
            background: white !important;
          }
          
          /* Hide decorative elements */
          .absolute {
            display: none !important;
          }
          
          /* Adjust table for print */
          table {
            page-break-inside: auto;
          }
          
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          
          /* Ensure borders show in print */
          table, th, td {
            border: 1px solid #ddd !important;
          }
        }
      `}</style>

      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-pink-300 rounded-full opacity-20 animate-pulse no-print"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-fuchsia-300 rounded-full opacity-30 animate-pulse delay-75 no-print"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-pink-400 rounded-full opacity-15 animate-pulse delay-150 no-print"></div>

      {/* Navigation */}
      <nav className="bg-gradient-to-r from-pink-500 via-pink-600 to-fuchsia-500 shadow-xl border-b-4 border-pink-300 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-white drop-shadow-lg flex items-center gap-2">
              💖 Grade Management System
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-white hover:text-pink-100 font-medium transition-colors duration-200 hover:scale-105 transform">
                Home
              </Link>
              <Link to="/students" className="text-white hover:text-pink-100 font-medium transition-colors duration-200 hover:scale-105 transform">
                Students
              </Link>
              <Link to="/subjects" className="text-white hover:text-pink-100 font-medium transition-colors duration-200 hover:scale-105 transform">
                Subjects
              </Link>
              <Link to="/grades" className="text-white font-bold underline underline-offset-4 decoration-2">
                Grades
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center mb-6 no-print">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-fuchsia-600 text-transparent bg-clip-text flex items-center gap-2">
            ✨ Grades Management
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
              + Add New Grade
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 no-print">
          <input
            type="text"
            placeholder="🔍 Search grades by student name, subject name, or subject code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 border-3 border-pink-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-500 shadow-md bg-white/90 backdrop-blur-sm text-gray-800 font-medium placeholder-pink-400"
          />
        </div>

        {/* PDF Download Link */}
        {pdfUrl && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl no-print">
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
                  download="grades_report.pdf"
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

        {/* Grades Table */}
        <div className="bg-gradient-to-br from-white to-pink-50 shadow-2xl rounded-3xl overflow-hidden border-4 border-pink-300 printable-table">
          <table className="min-w-full divide-y divide-pink-200">
            <thead className="bg-gradient-to-r from-pink-400 to-fuchsia-400">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Prelim
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Midterm
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Semi-final
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Final
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                  Computed Grade
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider no-print">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/80 backdrop-blur-sm divide-y divide-pink-100">
              {filteredGrades.map((grade) => {
                const finalGrade = calculateFinalGrade(grade);
                return (
                  <tr key={grade.id} className="hover:bg-pink-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-pink-700">
                      {getStudentName(grade.student_id)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                      {getSubjectCode(grade.subject_id)} - {getSubjectName(grade.subject_id)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {grade.prelim || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {grade.midterm || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {grade.semifinal || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {grade.final || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(finalGrade)}`}>
                        {finalGrade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold space-x-3 no-print">
                      <button
                        onClick={() => handleEdit(grade)}
                        className="text-pink-600 hover:text-pink-800 transition-colors duration-200"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(grade.id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredGrades.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No grade records found. {searchTerm && 'Try adjusting your search terms.'}
            </div>
          )}
        </div>

        {/* AI Analysis Section */}
        {filteredGrades.length > 0 && (
          <div className="mt-8 bg-gradient-to-br from-white to-pink-50 shadow-2xl rounded-3xl p-6 border-4 border-pink-300 printable-analysis">
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-pink-600 to-fuchsia-600 text-transparent bg-clip-text mb-6 flex items-center gap-2">
              🤖 AI Performance Analysis
            </h2>

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl p-4 border-2 border-pink-200">
                <div className="text-3xl font-bold text-pink-700">{analysisData.totalStudents}</div>
                <div className="text-sm text-pink-600 font-medium">Total Students</div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-4 border-2 border-blue-200">
                <div className="text-3xl font-bold text-blue-700">{analysisData.averageGrade}</div>
                <div className="text-sm text-blue-600 font-medium">Average Grade</div>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 border-2 border-green-200">
                <div className="text-3xl font-bold text-green-700">{analysisData.passedStudents}</div>
                <div className="text-sm text-green-600 font-medium">Passed Students</div>
              </div>
              <div className="bg-gradient-to-br from-red-100 to-rose-100 rounded-xl p-4 border-2 border-red-200">
                <div className="text-3xl font-bold text-red-700">{analysisData.failedStudents}</div>
                <div className="text-sm text-red-600 font-medium">Failed Students</div>
              </div>
            </div>

            {/* Analysis Insights */}
            <div className="bg-white rounded-xl p-5 mb-6 shadow-md border-2 border-pink-100">
              <h3 className="text-lg font-bold text-pink-700 mb-3">📈 Key Insights</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">•</span>
                  <span>
                    <strong>Overall Performance:</strong> {analysisData.averageGrade >= 75 ? '✅ GOOD' : '⚠️ NEEDS IMPROVEMENT'} 
                    {' '}(Average Grade: {analysisData.averageGrade})
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">•</span>
                  <span>
                    <strong>Pass Rate:</strong> {analysisData.passRate}% of students met the passing requirement (≥75)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">•</span>
                  <span>
                    <strong>Students Needing Attention:</strong> {analysisData.failedStudents} student{analysisData.failedStudents !== 1 ? 's' : ''} below passing grade
                  </span>
                </li>
                {analysisData.failedStudents > 0 && (
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold">•</span>
                    <span>
                      <strong>Recommendation:</strong> Implement additional support programs and tutoring sessions for struggling students
                    </span>
                  </li>
                )}
                {analysisData.averageGrade >= 85 && (
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold">•</span>
                    <span>
                      <strong>Excellence:</strong> Class performance exceeds expectations! Keep up the great work! 🎉
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {/* Student Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Passed Students */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200">
                <h3 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
                  ✅ Passed Students ({analysisData.passedStudents})
                </h3>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {analysisData.passedStudentsList.length > 0 ? (
                    analysisData.passedStudentsList.map((student, index) => (
                      <div key={index} className="text-sm text-green-800 bg-white/50 rounded px-3 py-1">
                        • {student}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-green-600 italic">No students passed yet</p>
                  )}
                </div>
              </div>

              {/* Failed Students */}
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-5 border-2 border-red-200">
                <h3 className="text-lg font-bold text-red-700 mb-3 flex items-center gap-2">
                  ⚠️ Needs Attention ({analysisData.failedStudents})
                </h3>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {analysisData.failedStudentsList.length > 0 ? (
                    analysisData.failedStudentsList.map((student, index) => (
                      <div key={index} className="text-sm text-red-800 bg-white/50 rounded px-3 py-1">
                        • {student}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-red-600 italic">All students are passing! 🎉</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <GradeForm
            grade={editingGrade}
            students={students}
            subjects={subjects}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default GradesPage;