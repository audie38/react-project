import { NoteData, Tag } from "../App";
import NoteForm from "../components/note/NoteForm";

type NoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export default function NoteAddEdit({ onSubmit, onAddTag, availableTags }: NoteProps) {
  return (
    <>
      <h1 className="text-capitalize mb-4">Add Note</h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </>
  );
}
