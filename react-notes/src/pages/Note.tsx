import { Tag } from "../App";
import { NoteList } from "../components/note/NoteList";

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
};

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

export default function Notes({ availableTags, notes }: NoteListProps) {
  return <NoteList notes={notes} availableTags={availableTags} />;
}
