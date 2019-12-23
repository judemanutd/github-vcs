import { Type } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoreModule, HttpCacheService } from '@app/core';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let githubService: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
      providers: [HttpCacheService, GithubService]
    });

    githubService = TestBed.get(GithubService);
    httpMock = TestBed.get(HttpTestingController as Type<HttpTestingController>);

    const htttpCacheService = TestBed.get(HttpCacheService);
    htttpCacheService.cleanCache();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getGithubRepo', () => {
    it('should return the repo of the inputted url', () => {
      // Arrange
      const mockGithub = { value: 'a random github' };

      // Act
      const randomGithubSubscription = githubService.getGithubRepo({ username: 'GlennFernandes', repo: 'dynasty' });

      // Assert
      randomGithubSubscription.subscribe((github: string) => {
        expect(github).toEqual(mockGithub.value);
      });
      httpMock.expectOne({}).flush(mockGithub);
    });

    it('should return a string in case of error', () => {
      // Act
      const GithubRepo = githubService.getGithubRepo({ username: 'GlennFernandes', repo: 'dynasty' });

      // Assert
      GithubRepo.subscribe((github: any) => {
        expect(typeof github).toEqual('object');
        expect(github).toContain('Error');
      });
      httpMock.expectOne({}).flush(null, {
        status: 500,
        statusText: 'error'
      });
    });
  });
});
