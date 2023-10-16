import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Notes from "./pages/Note";
import NoteAdd from "./pages/NoteAdd";
import { NoteEdit } from "./pages/NoteEdit";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { NoteDetail } from "./pages/NoteDetail";

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return { ...note, tags: tags.filter((tag) => note.tagIds.includes(tag.id)) };
    });
  }, [notes, tags]);

  function onCreateNote(data: NoteData) {
    setNotes((prevNotes) => {
      return [...prevNotes, { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) }];
    });
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Notes availableTags={tags} notes={notesWithTags} />,
    },
    {
      path: "/note",
      element: <NoteAdd onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />,
    },
    {
      path: "/note/:id",
      element: <NoteDetail notes={notesWithTags} onDelete={onDeleteNote} />,
    },
    {
      path: "/note/:id/edit",
      element: <NoteEdit notes={notesWithTags} onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags} />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return (
    <>
      <Container className="my-4">
        <RouterProvider router={router} />
      </Container>
    </>
  );
}

export default App;
