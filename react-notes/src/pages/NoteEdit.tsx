import { Navigate, useParams } from "react-router";
import { Note, NoteData, Tag } from "../App";
import NoteForm from "../components/note/NoteForm";

type NoteEditProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  notes: Note[];
};

export function NoteEdit({ onSubmit, onAddTag, availableTags, notes }: NoteEditProps) {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);
  if (note == null) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <h1 className="text-capitalize mb-4">Edit Note</h1>
      <NoteForm onSubmit={(data) => onSubmit(note.id, data)} onAddTag={onAddTag} availableTags={availableTags} title={note.title} markdown={note.markdown} tags={note.tags} />
    </>
  );
}
