import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CandidateTree } from '../candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(public http: HttpClient) { }

  getAll() {
    return this.http.get("assets/candidates/2020/candidates.json").toPromise();
  }

  // Mayoral Candidates
  getMayors() {
    return this.getAll().then(
      (all: Record<string, CandidateTree>) => Promise.all(
        Object.values(all["mayor"].candidates).map(url => this.http.get(url).toPromise())
      )
    );
  }

  // City Attorney Candidates
  getCityAttorneys() {
    return this.getAll().then(
      (all: Record<string, CandidateTree>) => Promise.all(
        Object.values(all["city-attorney"].candidates).map(url => this.http.get(url).toPromise())
      )
    );
  }

  // City Council Candidates
  getCityCouncilorsByDistrict(districtNumber: string) {
    let districtName = `city-council-district-${districtNumber}`;

    return this.getAll().then(
      (all: Record<string, CandidateTree>) => Promise.all(
        Object.values(all[districtName].candidates).map(url => this.http.get(url).toPromise())
      )
    );
  }
}
