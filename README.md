# Tufin SecureCloud Documentation

## In a Nutshell 

This is the documentation repository for Tufin SecureCloud. If you are just looking to read the product documentation see it [here](https://forum.tufin.com/support/kc/R_securecloud). 

## Context Sensitive Help (CSH)
The base URL is https://forum.tufin.com/support/kc/securecloud. This is both the entry point for the general documentation and also the prefix for each "What can I do on this page?"

To build a "What can I do on this page" link:
1. Look at the CSV file https://github.com/Tufin/orca-docs/blob/master/Project/Advanced/CSH/CloudAlias.csv. You need just 2 columns in the table - "Identifier" and "Path". All other columns are for Docteam's use.
2. First identify the page you need from the "Path" column.
3. Then take the identifier from the "identifier" column.
4. Insert the code as an argument to the base URL in the format ...#cshid=SCL_SignUp

If the page you need doesn't appear in the file, get the doc team to add it.
