1. for each term, go into ./constants and change the term to the current term

Intended Behaviour:
- if an inputted member's name matches a member from a recent previous term (1 or 2 terms ago), it gets *REPLACED*
- if it matches BUT that duplicate member is from this term, *NO REPLACEMENT HAPPENS*
- >= 3 terms ago, *nothing happens* with them (just get stored)

- resulting "new members" should be sorted by team

### Conditions for replacement
1. **OLD**: Member was last active 3 or more terms ago -> *just appended*
2. **PREVIOUS**: Member was active 1 or 2 terms ago, -> *duplicates* **replaced**
3. **CURRENT**: Member is returning this term -> *duplicates* **appended**

Assume current term is 1241
1. term <= 1238, gets appended
2. term == 1239 || 1240, any named duplicates are replaced
3. term == 1241, all duplicates remain, nothing is replaced

*NOTE: if there exists a PREVIOUS term headshot, user will have the option to use that*

TODO:
- better UI