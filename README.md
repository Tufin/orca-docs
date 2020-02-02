# orca-docs - Tufin SecureCloud Documentation

## In a Nutshell 

This is the documentation repository for Tufin SecureCloud. If you are just looking to read the product documentation see [here](https://forum.tufin.com/support/kc/R_securecloud). 

## Context Sensitive Help Codes (CSH)
The CSH system uses 2 files - AliasFile.flali and HeaderFile.h

Method1 - using the CSH name string
1. Look in the file [AliasFile.flali](Project/Advanced/AliasFile.flali)
2. Identify the page you need from the "Link" property and note the "Name" property for the entry
3. Display the page using the "Link" property (never use the path in the "Name" property - it will change). Use the format path#cshid=Name 
e.g. https://forum.tufin.com/support/kc/R_Orca/Default.htm#cshid=Vulnerabilities

Not all pages are designated for CSH. If the required page doesn't appear in the file, the doc team must add it via the Madcap Flare authoring tool

Method 2 - using the CSH number 
1. Get the name string as described above.
2. Look at the file [HeaderFile.h](Project/Advanced/HeaderFile.h)
3. Identify the name you noted above and note the number 
4. Display the page using the URL in format path#cshid=number    
e.g. https://forum.tufin.com/support/kc/R_Orca/Default.htm#cshid=1001 
