<xsl:for-each select="testsuites">
	<xsl:for-each select="testsuite">
		<xsl:for-each select="testcase"><xsl:value-of select="@name" />-</xsl:for-each>
	</xsl:for-each>
</xsl:for-each>