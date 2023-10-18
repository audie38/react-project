import { Tag } from "../App";
import { NoteList } from "../components/note/NoteList";

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

export default function Notes({ availableTags, notes, updateTag, deleteTag }: NoteListProps) {
  return <NoteList notes={notes} availableTags={availableTags} updateTag={updateTag} deleteTag={deleteTag} />;
}
