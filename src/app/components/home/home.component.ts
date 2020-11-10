import { Component, HostListener, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { CandidateService, SidenavService } from '../../services';
import { CandidateTree } from '../../candidate';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  isExpanded: boolean = false;
  showSubmenu: boolean = false;
  panelOpenState: boolean = false;
  officeStep: number = -1;
  councilDistrictStep: number = -1;
  selectedCandidate: string;

  candidates: Record<string, CandidateTree>;
  modifiedData: {} = {};
  sortedObj: {} = {};

  @ViewChild('drawer') sidenav: MatDrawer;

  constructor(
    private candidateService: CandidateService,
    private sidenavService: SidenavService,
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    if (this.sidenav !== undefined) {
      if (event.target.innerWidth <= 1000) {
        this.sidenav.close();
      } else {
        this.sidenav.open();
      }
    }
  }

  ngOnInit() {
    this.candidateService.getAll().then(
      (all: Record<string, CandidateTree>) => {
        this.candidates = all;

        this.massageCandidateData();
      }
    )
  }

  // Have active-link class apply to only an opened candidate office panel by setting an assigned step for each candidate office section
  setOfficeStep(index) {
    this.officeStep = index;
  }

  // Have only one city council district side panel open at any time by setting an assigned step for each panel distrct
  setCouncilDistrictStep(index) {
    this.councilDistrictStep = index;
  }

  selectSidenavCandidate(candidateKey: string) {
    this.selectedCandidate = candidateKey;
    this.sidenavService.emitChangeFromSidenav(candidateKey);
  }

  // data is turned into a key value pair
  //object like this
  //{
  //  mayor:{},
  //  city-council:{},
  //  city-attorney:{}
  //}
  massageCandidateData() {

    this.modifiedData["city council"] = {} as CandidateTree;
    this.modifiedData["city council"]["title"] = "City Council";
    this.modifiedData["city council"]["name"] = "City Council";
    this.modifiedData["city council"]["deepTree"] = true;
    this.modifiedData["city council"]["candidates"] = {};

    const entries = Object.entries(this.candidates);

    entries.forEach(entry => {
      if (!entry["0"].toLowerCase().includes("last")) {
        if (!entry["0"].toLowerCase().includes("city-council")) {
          this.modifiedData[entry["0"]] = entry["1"];
          this.modifiedData[entry["0"]]["deeptree"]= false;
        } else {
          this.modifiedData["city council"]["candidates"][entry["0"]] = entry["1"];
        }
      }

    });

    this.sortedObj = this.sortObj(this.modifiedData);
  }


  private sortObj(modifiedObject) {
    let temp = {};
    let modData = this.modifiedData;
    var sortedEntries = Object.keys(modifiedObject).sort(function (a, b) {
      return b.charCodeAt(0) - a.charCodeAt(0);
    });

    sortedEntries.forEach(x => {
      temp[x] = modData[x];
    });

    return temp;

  }

  asIsOrder(a, b) {
    return 1;
  }
}
