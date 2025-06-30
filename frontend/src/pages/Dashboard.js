import { useState, useEffect } from 'react';
import axios from "../utils/axios.js"; 
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Checkbox,
  IconButton,
  Paper,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import NotesIcon from '@mui/icons-material/Notes';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { motion, AnimatePresence } from "framer-motion";


export default function Dashboard() {
  const [questions, setQuestions] = useState([]);

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [noteInput, setNoteInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  const [addOpen, setAddOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    url: '',
    notes: '',
    tags: '',
    difficulty: '',
  });

  const [urlDialogOpen, setUrlDialogOpen] = useState(false);
  const [questionUrlInput, setQuestionUrlInput] = useState("");
  const [autofilledQuestion, setAutofilledQuestion] = useState({
    title: "",
    url: "",
    tags: "",
    notes: "",
    difficulty: "",
  });

  const [copySuccess, setCopySuccess] = useState("");
const token = localStorage.getItem('token');
const handleCopyToken = () => {
  if (token) {
    navigator.clipboard.writeText(token);
    setCopySuccess("Token copied!");
    setTimeout(() => setCopySuccess(""), 1500);
  }
};
const [tokenDialogOpen, setTokenDialogOpen] = useState(false);


  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("/api/questions");
      setQuestions(res.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  const handleAddQuestion = async () => {
    try {
      const res = await axios.post("/api/questions", newQuestion);
      setQuestions((prev) => [res.data, ...prev]);
      setAddOpen(false);
      setNewQuestion({ title: '', url: '', notes: '', tags: '', difficulty: '' });
    } catch (err) {
      console.error("Failed to add question:", err);
    }
  };

  const toggleStatus = async (index) => {
    const question = questions[index];
    try {
      const res = await axios.patch(`/api/questions/${question._id}`, {
        status: !question.status,
      });
      setQuestions(prev => prev.map((q, i) => (i === index ? res.data : q)));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const toggleRevisit = async (index) => {
    const question = questions[index];
    try {
      const res = await axios.patch(`/api/questions/${question._id}`, {
        revisit: !question.revisit,
      });
      setQuestions(prev => prev.map((q, i) => (i === index ? res.data : q)));
    } catch (err) {
      console.error("Error updating revisit:", err);
    }
  };

  const handleOpenDialog = (index) => {
    setCurrentIndex(index);
    setNoteInput(questions[index].notes);
    setTagInput(questions[index].tags || '');
    setOpen(true);
  };

  const handleSaveNote = async () => {
    const question = questions[currentIndex];
    try {
      const res = await axios.patch(`/api/questions/${question._id}`, {
        notes: noteInput,
        tags: tagInput,
      });
      setQuestions(prev => prev.map((q, i) => (i === currentIndex ? res.data : q)));
      setOpen(false);
    } catch (err) {
      console.error("Error updating notes/tags:", err);
    }
  };

  const handleFetchFromUrl = async () => {
    try {
      const res = await axios.get(`/api/parse-question?url=${encodeURIComponent(questionUrlInput)}`);
      const { title, difficulty, tags } = res.data;

      setAutofilledQuestion({
        title: title || "",
        url: questionUrlInput,
        difficulty: difficulty || "",
        tags: tags ? tags.join(", ") : "",
        notes: "",
      });
    } catch (err) {
      console.error("Error fetching from URL:", err);
    }
  };

  const handleSubmitAutofilled = async () => {
    try {
      const res = await axios.post("/api/questions", autofilledQuestion);
      setQuestions((prev) => [res.data, ...prev]);
      setUrlDialogOpen(false);
      setQuestionUrlInput("");
      setAutofilledQuestion({ title: "", url: "", tags: "", notes: "", difficulty: "" });
    } catch (err) {
      console.error("Failed to add autofilled question:", err);
    }
  };
 const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
  };
  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };


  return (
    <Box sx={{ p: 4, bgcolor: '#c3aa94', minHeight: '100vh' }}>
       <motion.div
    initial={{ opacity: 0, y: 32 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
         <Button
        variant="outlined"
        sx={{ color: '#534E4A', borderColor: '#534E4A' }}
        onClick={() => setTokenDialogOpen(true)}
      >
        EXTENSION TOKEN
      </Button>
        <Button
          variant="outlined"
          sx={{ color: '#534E4A', borderColor: '#534E4A' }}
          onClick={() => setUrlDialogOpen(true)}
        >
          + Add from URL
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#534E4A', '&:hover': { backgroundColor: '#3f3a36' } }}
          onClick={() => setAddOpen(true)}
        >
          + Add Question
        </Button>
      </Box>
      </motion.div>
      

      <TableContainer component={Paper} sx={{ backgroundColor: '#F5F1EC', borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#e5e5c7' }}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Problem</TableCell>
              <TableCell align="center">Difficulty</TableCell>
              <TableCell align="center">Notes</TableCell>
              <TableCell align="center">Tags</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Revisit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((q, index) => (
              <TableRow key={q._id} sx={{ backgroundColor: q.status ? '#7CEA9C' : '#F5F1EC' }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <a href={q.url} target="_blank" rel="noreferrer" style={{ color: '#534E4A' }}>
                    {q.title}
                  </a>
                </TableCell>
                <TableCell align="center">{q.difficulty || '-'}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit Notes & Tags">
                    <IconButton onClick={() => handleOpenDialog(index)}>
                      <NotesIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">{q.tags}</TableCell>
                <TableCell align="center">
                  <Checkbox checked={q.status} onChange={() => toggleStatus(index)} color="success" />
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => toggleRevisit(index)}>
                    {q.revisit ? (
                      <BookmarkIcon sx={{ color: '#fbc02d' }} />
                    ) : (
                      <BookmarkBorderIcon />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog: Edit Notes & Tags */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Notes & Tags</DialogTitle>
        <DialogContent>
          <TextField
            label="Notes"
            fullWidth
            multiline
            rows={3}
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Tags (comma separated)"
            fullWidth
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleSaveNote} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog: Add Manual Question */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Question</DialogTitle>
        <DialogContent>
          <TextField label="Problem Title" fullWidth value={newQuestion.title} onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })} margin="normal" />
          <TextField label="Problem URL" fullWidth value={newQuestion.url} onChange={(e) => setNewQuestion({ ...newQuestion, url: e.target.value })} margin="normal" />
          <TextField label="Difficulty" fullWidth value={newQuestion.difficulty} onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })} margin="normal" />
          <TextField label="Tags (comma separated)" fullWidth value={newQuestion.tags} onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value })} margin="normal" />
          <TextField label="Notes" fullWidth multiline rows={3} value={newQuestion.notes} onChange={(e) => setNewQuestion({ ...newQuestion, notes: e.target.value })} margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleAddQuestion} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog: Add from URL */}
      <Dialog open={urlDialogOpen} onClose={() => setUrlDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Question from URL</DialogTitle>
        <DialogContent>
          <TextField label="Problem URL" fullWidth value={questionUrlInput} onChange={(e) => setQuestionUrlInput(e.target.value)} margin="normal" />
          <Button variant="outlined" onClick={handleFetchFromUrl}>Fetch Details</Button>
          <TextField label="Problem Title" fullWidth margin="normal" value={autofilledQuestion.title} onChange={(e) => setAutofilledQuestion({ ...autofilledQuestion, title: e.target.value })} />
          <TextField label="Difficulty" fullWidth margin="normal" value={autofilledQuestion.difficulty} onChange={(e) => setAutofilledQuestion({ ...autofilledQuestion, difficulty: e.target.value })} />
          <TextField label="Tags (comma separated)" fullWidth margin="normal" value={autofilledQuestion.tags} onChange={(e) => setAutofilledQuestion({ ...autofilledQuestion, tags: e.target.value })} />
          <TextField label="Notes" fullWidth margin="normal" multiline rows={3} value={autofilledQuestion.notes} onChange={(e) => setAutofilledQuestion({ ...autofilledQuestion, notes: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUrlDialogOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleSubmitAutofilled} variant="contained">Add Question</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={tokenDialogOpen} onClose={() => setTokenDialogOpen(false)} maxWidth="sm" fullWidth>
  <DialogTitle>Extension Token</DialogTitle>
  <DialogContent>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
      <TextField
        value={token || ""}
        size="small"
        InputProps={{ readOnly: true }}
        sx={{ flex: 1 }}
      />
      <Button
        variant="outlined"
        startIcon={<ContentCopyIcon />}
        onClick={handleCopyToken}
        disabled={!token}
      >
        Copy
      </Button>
    </Box>
    <span style={{ color: 'green', marginLeft: 8 }}>{copySuccess}</span>
    <div style={{ fontSize: "0.9em", marginTop: 4 }}>
      Paste this in your Chrome extension popup to connect it to your account.
    </div>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setTokenDialogOpen(false)}>Close</Button>
  </DialogActions>
</Dialog>

    </Box>
  );
}
