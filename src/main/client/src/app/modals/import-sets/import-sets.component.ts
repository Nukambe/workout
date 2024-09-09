import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalComponent } from "../modal.component";
import { FormsModule } from '@angular/forms';
import { Set } from '../../models/Set.model';

@Component({
  selector: 'app-import-sets',
  standalone: true,
  imports: [ModalComponent, FormsModule],
  templateUrl: './import-sets.component.html',
  styleUrl: './import-sets.component.css'
})
export class ImportSetsComponent implements OnInit {

  @Output() add: EventEmitter<Set[]> = new EventEmitter<Set[]>();
  @Output() replace: EventEmitter<Set[]> = new EventEmitter<Set[]>();
  @Output() close: EventEmitter<void> = new EventEmitter();
  importText: string = "";
  invalidImport: boolean = false;
  importedSets: Set[] = [];

  constructor() { }

  async ngOnInit(): Promise<void> {
    try {
      await this.pasteText();
    } catch (error) {
      console.error(error);
      this.invalidImport = true;
    }
  }

  async pasteText() {
    this.importText = await navigator.clipboard.readText();
    this.evaluateImport();
  }

  evaluateImport() {
    try {
      const importedSets: Set[] = [];
      const setLines: string[] = this.importText.split("\n");
      const setLinesSplit: string[][] = setLines.map((set: any) => set.split(" "));
      setLinesSplit.forEach((setImport: string[], index: number) => {
        const newSet = new Set();
        newSet.number = index + 1;
        newSet.reps = setImport[0];

        const repeat = parseInt(setImport[2]);
        if (!isNaN(repeat)) newSet.repeat = repeat;
        else throw new Error("Repeat is NaN");

        const ratio = parseFloat(setImport[4].slice(0, 2));
        if (!isNaN(ratio)) newSet.ratio = ratio;
        else throw new Error("Ratio is NaN");

        importedSets.push(newSet);
      });
      this.importedSets = importedSets;
      this.invalidImport = false;
    } catch (error) {
      this.invalidImport = true;
    }
  }

  addSets() {
    this.add.emit(this.importedSets);
  }

  replaceSets() {
    this.replace.emit(this.importedSets);
  }

  closeModal() {
    this.close.emit();
  }
}
